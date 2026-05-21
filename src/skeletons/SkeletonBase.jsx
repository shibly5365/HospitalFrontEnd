// components/loadings/PatientLoading.jsx

import React from "react";
import { motion } from "framer-motion";

const PatientLoading = () => {
  return (
    <div
      className="
        min-h-screen
        theme-bg
        flex
        items-center
        justify-center
        overflow-hidden
        relative
      "
    >
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="
            absolute
            w-2
            h-2
            rounded-full
            bg-cyan-400/30
dark:bg-[var(--brand)]/30
          "
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.8, 0.5],
            x: [Math.random() * 800 - 400, Math.random() * 800 - 400],
            y: [Math.random() * 600 - 300, Math.random() * 600 - 300],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}

      <div className="text-center z-10 px-4">
        {/* Medical Circle */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            mx-auto
            mb-8
            w-24
            h-24
            rounded-full
            border-4
            border-[var(--brand)]/30
            flex
            items-center
            justify-center
            theme-card
          "
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-5xl"
          >
            🩺
          </motion.div>
        </motion.div>

        {/* ECG Line */}
        <div
          className="
            w-full
            max-w-[380px]
            h-20
            mx-auto
            mb-10
            relative
          "
        >
          <svg viewBox="0 0 400 80" className="w-full h-full">
            <motion.path
              d="M0 40 Q50 10 100 40 Q150 70 200 40 Q250 10 300 40 Q350 70 400 40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            text-2xl
            sm:text-3xl
            font-semibold
            theme-text
            mb-3
            tracking-tight
          "
        >
          Preparing your health journey...
        </motion.h2>

        {/* Subtitle */}
        <p
          className="
            theme-text-muted
            text-sm
            sm:text-lg
          "
        >
          Connecting with your medical records
        </p>

        {/* Progress Bar */}
        <div
          className="
            w-full
            max-w-[320px]
            h-1.5
            theme-soft
            rounded-full
            mx-auto
            mt-10
            overflow-hidden
          "
        >
          <motion.div
            className="
              h-full
              bg-gradient-to-r
from-cyan-400
via-purple-500
to-cyan-400
            "
            initial={{
              width: "0%",
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientLoading;
