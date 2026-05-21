// src/components/support/ComplaintDrawer.jsx
import React from 'react';
import { X, Paperclip, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ComplaintDrawer = ({ ticket, isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-full w-full max-w-[520px] bg-zinc-900 border-l border-zinc-700 shadow-2xl z-[60] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-700 flex items-center justify-between">
          <div>
            <p className="font-mono text-emerald-400 text-sm">{ticket.id}</p>
            <h2 className="text-xl font-semibold mt-1 pr-8">{ticket.type}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-4xl text-zinc-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 space-y-10">
          {/* Complainant Info */}
          <div>
            <p className="uppercase text-xs tracking-widest text-zinc-500 mb-3">Complainant</p>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-zinc-700 rounded-2xl" />
              <div>
                <p className="font-semibold text-lg">{ticket.complainant}</p>
                <p className="text-zinc-400 text-sm">Patient • Age 34 • Thiruvananthapuram</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="uppercase text-xs tracking-widest text-zinc-500 mb-3">Description</p>
            <p className="text-zinc-300 leading-relaxed">{ticket.description}</p>
          </div>

          {/* Timeline */}
          <div>
            <p className="uppercase text-xs tracking-widest text-zinc-500 mb-4">Activity Timeline</p>
            <div className="space-y-6 pl-6 border-l border-dashed border-zinc-700">
              <div className="relative">
                <div className="absolute -left-[9px] w-4 h-4 bg-emerald-400 rounded-full" />
                <p className="text-xs text-zinc-500">Just now</p>
                <p className="font-medium">You viewed this ticket</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[9px] w-4 h-4 bg-zinc-600 rounded-full" />
                <p className="text-xs text-zinc-500">2 hours ago</p>
                <p className="font-medium">Status changed to <span className="text-blue-400">In Review</span></p>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <p className="uppercase text-xs tracking-widest text-zinc-500 mb-3">Attachments</p>
            <div className="border border-dashed border-zinc-700 rounded-3xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
              <Paperclip className="mx-auto text-zinc-500" size={32} />
              <p className="text-sm mt-3 text-zinc-400">screenshot-complaint.jpg</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-zinc-700 space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Update Status</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500">
              <option>In Review</option>
              <option>Resolved</option>
              <option>Escalated</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 border border-zinc-700 hover:bg-zinc-800 rounded-2xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Ticket Updated Successfully!");
                onClose();
              }}
              className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl transition-all"
            >
              Update Ticket
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ComplaintDrawer;