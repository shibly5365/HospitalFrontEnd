// src/components/support/SupportHeader.jsx
import React from 'react';
import { Plus, Download, Bell, Search } from 'lucide-react';

const SupportHeader = ({
  searchTerm, setSearchTerm,
  selectedType, setSelectedType,
  selectedPriority, setSelectedPriority
}) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-lg px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Support Center</h1>
          <p className="text-xs text-emerald-400 flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            LIVE MONITORING
          </p>
        </div>

        <div className="relative w-96">
          <Search className="absolute left-5 top-3.5 text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search tickets, patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-emerald-500 rounded-3xl py-3 pl-12 pr-5 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2.5 text-sm focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="Appointment Delay">Appointment Delay</option>
          <option value="Billing Issue">Billing Issue</option>
          <option value="Technical Error">Technical Error</option>
          <option value="Doctor Misbehavior">Doctor Misbehavior</option>
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2.5 text-sm focus:outline-none"
        >
          <option value="">All Priority</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition-colors">
          <Download size={18} />
          <span>Export</span>
        </button>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl transition-all active:scale-95">
          <Plus size={20} />
          New Ticket
        </button>

        <div className="relative cursor-pointer p-2 hover:bg-zinc-800 rounded-xl">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">7</span>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="text-right">
            <div className="text-sm font-medium">Dr. Ananya Sharma</div>
            <div className="text-xs text-zinc-500">Admin • Kerala</div>
          </div>
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">AS</div>
        </div>
      </div>
    </header>
  );
};

export default SupportHeader;