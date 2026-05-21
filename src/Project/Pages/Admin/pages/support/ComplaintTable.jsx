// src/components/support/ComplaintTable.jsx
import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const ComplaintTable = ({ tickets, onRowClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'High': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-400';
      case 'In Review': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-amber-500/10 text-amber-400';
    }
  };

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-5 text-left w-12">
                <input type="checkbox" className="accent-emerald-500" />
              </th>
              <th className="px-6 py-5 text-left">Ticket ID</th>
              <th className="px-6 py-5 text-left">Complainant</th>
              <th className="px-6 py-5 text-left">Type</th>
              <th className="px-6 py-5 text-left">Department</th>
              <th className="px-6 py-5 text-left">Priority</th>
              <th className="px-6 py-5 text-left">Status</th>
              <th className="px-6 py-5 text-left">Date</th>
              <th className="px-6 py-5 text-left">Assigned To</th>
              <th className="px-6 py-5 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {tickets.map((ticket, index) => (
              <tr
                key={index}
                onClick={() => onRowClick(ticket)}
                className="group hover:bg-zinc-800/70 transition-colors cursor-pointer"
              >
                <td className="px-6 py-5">
                  <input type="checkbox" className="accent-emerald-500" onClick={e => e.stopPropagation()} />
                </td>
                <td className="px-6 py-5 font-mono text-emerald-400 font-medium">{ticket.id}</td>
                <td className="px-6 py-5 font-medium">{ticket.complainant}</td>
                <td className="px-6 py-5">
                  <span className="text-sm text-zinc-400">{ticket.type}</span>
                </td>
                <td className="px-6 py-5 text-zinc-400">{ticket.department}</td>
                
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-4 py-1 text-xs font-medium rounded-2xl border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-4 py-1 text-xs font-medium rounded-2xl ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-zinc-400 text-sm">{ticket.date}</td>
                <td className="px-6 py-5 text-zinc-400">{ticket.assigned}</td>
                
                <td className="px-6 py-5">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-emerald-400 text-xl">→</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-8 py-5 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-400">
        <div>1 — 25 of {tickets.length} tickets</div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Previous</button>
          <button className="bg-emerald-500 text-black px-4 py-2 rounded-2xl font-medium">1</button>
          <button className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTable;