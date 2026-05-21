import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVenusMars } from "react-icons/fa";

export const SelectField = ({ name, label, register, error, options }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative group">
        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200 w-4 h-4" />
        <select
          id={name}
          {...register(name)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 transition-colors duration-200 outline-none appearance-none
            ${error 
              ? "border-red-300 focus:border-red-500 bg-red-50" 
              : "border-gray-200 focus:border-teal-400 bg-white/50"
            } hover:border-teal-300 focus:shadow-lg`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};