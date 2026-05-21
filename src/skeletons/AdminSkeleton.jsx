// components/loadings/AdminLoading.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AdminLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-zinc-900 flex items-center justify-center">
      <div className="max-w-2xl w-full px-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold text-white text-center mb-4"
        >
          Building Hospital Intelligence
        </motion.h1>

        <div className="grid grid-cols-3 gap-6 mt-16">
          {["Revenue", "Patients", "Staff"].map((label, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-4xl font-mono text-emerald-400 mb-2"
              >
                {Math.floor(Math.random() * 98) + 1}%
              </motion.div>
              <p className="text-white/70">{label} Dashboard</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLoading;