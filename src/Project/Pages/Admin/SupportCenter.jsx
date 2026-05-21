// src/pages/admin/SupportCenter.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Bell, Download } from 'lucide-react';

import SupportStats from './pages/support/SupportStats';
import ComplaintTable from './pages/support/ComplaintTable';
import ComplaintDrawer from './pages/support/ComplaintDrawer';
import ActivityFeed from './pages/support/ActivityFeed';

const SupportCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Expanded Mock Data with various departments & sides
  const [tickets] = useState([
    {
      id: "MC-39281",
      complainant: "Rahul Menon",
      type: "Appointment Delay",
      department: "Cardiology",
      priority: "High",
      status: "In Review",
      date: "May 17, 2026",
      assigned: "Dr. Ananya Sharma",
      description: "Had to wait over 2 hours for appointment with Dr. Priya.",
      side: "Patient"
    },
    {
      id: "MC-39280",
      complainant: "Meera Nair",
      type: "Billing Issue",
      department: "Finance",
      priority: "Medium",
      status: "Open",
      date: "May 16, 2026",
      assigned: "Unassigned",
      description: "Double charged for consultation fee.",
      side: "Patient"
    },
    {
      id: "MC-39279",
      complainant: "Dr. Suresh Kumar",
      type: "System Lag",
      department: "IT",
      priority: "Critical",
      status: "Resolved",
      date: "May 16, 2026",
      assigned: "Tech Team",
      description: "EMR system very slow during OPD hours.",
      side: "Doctor"
    },
    {
      id: "MC-39278",
      complainant: "Priya Thomas",
      type: "Receptionist Behavior",
      department: "Reception",
      priority: "High",
      status: "Open",
      date: "May 15, 2026",
      assigned: "Admin",
      description: "Reception staff was rude and unhelpful.",
      side: "Patient"
    },
    {
      id: "MC-39277",
      complainant: "Dr. Anjali Menon",
      type: "Prescription Error",
      department: "General Medicine",
      priority: "Critical",
      status: "In Review",
      date: "May 15, 2026",
      assigned: "Medical Supervisor",
      description: "Wrong medicine printed in patient's prescription.",
      side: "Doctor"
    },
    {
      id: "MC-39276",
      complainant: "Website User",
      type: "Website Bug",
      department: "IT",
      priority: "Medium",
      status: "Open",
      date: "May 14, 2026",
      assigned: "Tech Team",
      description: "Appointment booking page not loading properly.",
      side: "Website"
    },
    {
      id: "MC-39275",
      complainant: "Ramesh Babu",
      type: "Payment Failure",
      department: "Billing",
      priority: "High",
      status: "Open",
      date: "May 14, 2026",
      assigned: "Finance Team",
      description: "Online payment failed but amount deducted.",
      side: "Patient"
    },
    {
      id: "MC-39274",
      complainant: "Nurse Sunita",
      type: "Staff Scheduling Issue",
      department: "Reception",
      priority: "Medium",
      status: "In Review",
      date: "May 13, 2026",
      assigned: "HR",
      description: "Night shift schedule not updated.",
      side: "Receptionist"
    }
  ]);

  const openTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTicket(null), 300);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || ticket.type === selectedType;
    const matchesPriority = !selectedPriority || ticket.priority === selectedPriority;

    return matchesSearch && matchesType && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Main Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-lg px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tighter">MedicalCare</span>
              <span className="font-bold text-2xl tracking-tighter text-emerald-400">Pro</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Support Center</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-4 top-3 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Search tickets, patients, doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-emerald-500 rounded-3xl py-3 pl-11 pr-5 text-sm focus:outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-colors">
            <Download size={18} />
            Export
          </button>

          <button 
            onClick={() => alert("New Ticket Form Opens Here")}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl transition-all active:scale-95"
          >
            <Plus size={20} />
            New Ticket
          </button>

          <div className="relative p-2 hover:bg-zinc-800 rounded-xl cursor-pointer">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">7</span>
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
            <div className="text-right text-sm">
              <div>Dr. Ananya Sharma</div>
              <div className="text-xs text-zinc-500">Admin</div>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">AS</div>
          </div>
        </div>
      </header>

      {/* Secondary Top Navigation Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-zinc-800 rounded-3xl p-1">
            {['All Tickets', 'Open', 'In Review', 'Resolved', 'High Priority'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-2.5 rounded-3xl text-sm font-medium transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-emerald-500 text-black shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              <option value="Appointment Delay">Appointment Delay</option>
              <option value="Billing Issue">Billing Issue</option>
              <option value="Payment Failure">Payment Failure</option>
              <option value="Receptionist Behavior">Receptionist Behavior</option>
              <option value="System Lag">System Lag</option>
              <option value="Website Bug">Website Bug</option>
              <option value="Prescription Error">Prescription Error</option>
              <option value="Staff Scheduling Issue">Staff Scheduling Issue</option>
              <option value="Doctor Misbehavior">Doctor Misbehavior</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <SupportStats />
          
          <div className="mt-8">
            <ComplaintTable 
              tickets={filteredTickets} 
              onRowClick={openTicket} 
            />
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Complaint Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedTicket && (
          <ComplaintDrawer 
            ticket={selectedTicket} 
            isOpen={isDrawerOpen} 
            onClose={closeDrawer} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportCenter;