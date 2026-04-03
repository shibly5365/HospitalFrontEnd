import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Search, Plus, Send, Paperclip, MoreVertical, ArrowLeft, Phone, Video, Menu, X } from "lucide-react";

const ChatPageDoctors = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const socketRef = useRef(null);
    const bottomRef = useRef(null);
    const pcRef = useRef(null);
    const localStreamRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const API = "http://localhost:4002/api/doctor";

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:4002');
        socketRef.current = socket;
        if (user?._id) socket.emit('register', user._id);

        socket.on("newMessage", (msg) => {
            setMessagesList((prev) => [...prev, msg]);
        });

        socket.on('incoming-call', async ({ from, offer }) => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localStreamRef.current = stream;
                const pc = new RTCPeerConnection();
                pcRef.current = pc;
                stream.getTracks().forEach((t) => pc.addTrack(t, stream));
                pc.ontrack = (ev) => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = ev.streams[0]; };
                pc.onicecandidate = (e) => { if (e.candidate) socket.emit('ice-candidate', { to: from, candidate: e.candidate }); };
                await pc.setRemoteDescription(offer);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.emit('answer-call', { to: from, answer });
            } catch (e) { console.error('failed to answer', e); }
        });

        socket.on('ice-candidate', async ({ candidate }) => { try { if (pcRef.current) await pcRef.current.addIceCandidate(candidate); } catch (e) { console.warn(e); } });

        // Load patients
        const loadPatients = async () => {
            try {
                const res = await axios.get(`${API}/getallPatients`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success && res.data.patients) {
                    const mapped = res.data.patients.map(p => ({
                        id: p.id,
                        userId: p.id, // the actual user _id of the patient
                        name: p.fullName,
                        role: "Patient",
                        avatar: p.profileImage || "https://i.pravatar.cc/100",
                        online: false
                    }));
                    setConversations(mapped);
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadPatients();

        return () => { socket.disconnect(); };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesList]);

    const loadMessages = async (userId) => {
        try {
            const res = await axios.get(`${API}/getMessage/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessagesList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = conversations.filter(c => activeFilter === "All" || activeFilter === "Patients");

    const handleSend = async () => {
        if (!message.trim() || !selectedChat) return;
        try {
            await axios.post(`${API}/sendMessage`, {
                receiverId: selectedChat.userId,
                text: message,
                receiverType: "users" // for doctor sending to patient, patient is a user
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            socketRef.current.emit("sendMessage", {
                sender: user._id, 
                receiver: selectedChat.userId, 
                text: message 
            });
            setMessage("");
        } catch(err) {
            console.error(err);
        }
    };


    const ChatBubble = ({ msg }) => {
        const isMe = msg.sender === user._id;
        return (
            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg ${isMe ? "order-2" : ""}`}>
                    <div className={`px-4 py-3 rounded-2xl shadow-md flex-wrap break-words ${isMe ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm"}`}>
                        {msg.text}
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${isMe ? "text-right" : "text-left"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"><Menu size={24} /></button>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Messages</h2>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"><Plus size={18} /><span className="hidden sm:inline">New Message</span></button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden relative">
                {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsSidebarOpen(false)} />}

                {/* Sidebar */}
                <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 lg:z-0 w-full sm:w-96 lg:w-96 h-full border-r bg-white/90 backdrop-blur-lg flex flex-col transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none`}>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition z-10"><X size={24} /></button>

                    {/* Search */}
                    <div className="p-4">
                        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm border border-gray-200">
                            <Search size={18} className="text-gray-500" />
                            <input type="text" placeholder="Search..." className="ml-3 bg-transparent outline-none text-sm flex-1" />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 px-4 mb-3 overflow-x-auto">
                        {["All", "Doctors", "Patients", "Staff"].map(tab => (
                            <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === tab ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{tab}</button>
                        ))}
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto">
                        {filtered.map(c => (
                            <div key={c.id} onClick={() => { setSelectedChat(c); setIsSidebarOpen(false); loadMessages(c.userId); }} className={`flex items-start p-4 cursor-pointer border-b border-gray-100 transition-all duration-200 ${selectedChat?.id === c.id ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"}`}>
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                                        <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                                    </div>
                                    {c.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>}
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1"><h4 className="font-semibold text-gray-800 truncate">{c.name}</h4><span className="text-xs text-gray-500 ml-2">{c.time}</span></div>
                                    <p className="text-sm text-gray-600 truncate mb-1">{c.message}</p>
                                    <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{c.role}</span>
                                </div>
                                {c.unread > 0 && <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">{c.unread}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-white">
                    {!selectedChat ? (
                        <div className="flex-1 flex items-center justify-center text-center p-6">
                            <div>
                                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl flex items-center justify-center shadow-2xl"><span className="text-6xl">💬</span></div>
                                <p className="text-xl font-semibold text-gray-800 mb-2">Select a Conversation</p>
                                <p className="text-sm text-gray-500 max-w-sm">Choose a conversation from the list to start messaging.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full h-full">
                            <div className="flex items-center justify-between p-4 md:p-5 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"><ArrowLeft size={20} /></button>
                                    <div className="relative"><img src={selectedChat.avatar} alt={selectedChat.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md" />{selectedChat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}</div>
                                    <div><h2 className="text-lg font-semibold text-gray-800">{selectedChat.name}</h2><p className="text-xs text-gray-500">{selectedChat.role}</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[Phone, Video].map((Icon, i) => <button key={i} className="p-2 hover:bg-gray-100 rounded-xl transition hidden sm:block"><Icon size={20} className="text-gray-600" /></button>)}
                                    <button className="p-2 hover:bg-gray-100 rounded-xl transition"><MoreVertical size={20} className="text-gray-600" /></button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                                {messagesList.length > 0 ? messagesList.map((msg, idx) => <ChatBubble key={idx} msg={msg} />) : <div className="flex items-center justify-center h-full text-gray-400 text-sm">Start your conversation with {selectedChat.name}</div>}
                                <div ref={bottomRef}></div>
                            </div>

                            <div className="p-4 md:p-5 bg-white/90 backdrop-blur-lg border-t border-gray-200">
                                <div className="flex items-center gap-2 md:gap-3 bg-gray-50 rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                                    <button className="p-2 hover:bg-gray-200 rounded-lg transition"><Paperclip size={20} className="text-gray-500" /></button>
                                    <input type="text" placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === "Enter" && handleSend()} className="flex-1 bg-transparent outline-none text-sm md:text-base" />
                                    <button onClick={handleSend} className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"><Send size={20} /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPageDoctors;
