// src/components/support/SupportStats.jsx
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Total Complaints", value: "248", change: "+18%", color: "emerald", icon: "AlertTriangle" },
  { label: "Open Tickets", value: "47", change: "65%", color: "amber", icon: "Clock" },
  { label: "Resolved", value: "189", change: "92%", color: "emerald", icon: "CheckCircle" },
  { label: "High Priority", value: "12", color: "rose", icon: "Flame" },
];

const SupportStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-zinc-400 text-sm">{stat.label}</p>
              <p className="text-4xl font-semibold tracking-tighter mt-3">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
              {/* You can replace with actual Lucide icons */}
              <span className="text-3xl">📋</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SupportStats;