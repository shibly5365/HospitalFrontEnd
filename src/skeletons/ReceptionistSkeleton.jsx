// components/loadings/ReceptionistLoading.jsx
import React from "react";
import { motion } from "framer-motion";

const ReceptionistLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 to-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center gap-6 mb-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
              className="w-5 h-16 bg-amber-400 rounded-full"
            />
          ))}
        </div>

        <h2 className="text-4xl font-semibold text-white">
          Syncing Front Desk
        </h2>
        <p className="text-amber-300 mt-3 text-lg">
          Patient queue • Token system • Doctor availability
        </p>
      </div>
    </div>
  );
};

export default ReceptionistLoading;
