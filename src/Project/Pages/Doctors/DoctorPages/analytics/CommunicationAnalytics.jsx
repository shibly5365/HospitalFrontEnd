// components/CommunicationAnalytics.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CommunicationAnalytics = ({ timeframe, chatAnalytics, appointmentInsights }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare size={24} className="text-blue-600" />
                Chat & Communication
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{chatAnalytics[timeframe].total}</div>
                    <div className="text-sm text-gray-600">Total Chats</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{chatAnalytics[timeframe].avgResponse}</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{chatAnalytics[timeframe].satisfaction}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                </div>
            </div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentInsights.bookingTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={timeframe} fill="#3b82f6" name="Appointments" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CommunicationAnalytics;