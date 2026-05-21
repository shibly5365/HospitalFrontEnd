// components/loadings/DoctorLoading.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DoctorLoading = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      <div className="text-center">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="text-7xl mb-8 inline-block"
        >
          👨‍⚕️
        </motion.div>

        <h2 className="text-4xl font-bold text-white mb-4">Loading Doctor Workspace</h2>
        <p className="text-emerald-400 text-xl mb-12">Analyzing patient data • Syncing schedule</p>

        {/* Animated Charts */}
        <div className="flex gap-8 justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-28 h-40 bg-zinc-900 rounded-2xl border border-emerald-500/20 relative overflow-hidden"
              animate={{ height: ["120px", "180px", "140px"] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
            >
              <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-emerald-500/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorLoading;