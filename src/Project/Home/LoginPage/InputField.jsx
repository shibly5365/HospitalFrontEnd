import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBirthdayCake, 
  FaLock 
} from "react-icons/fa";

const iconMap = {
  user: FaUser,
  email: FaEnvelope,
  phone: FaPhone,
  birthday: FaBirthdayCake,
  lock: FaLock,
};

export const InputField = ({ 
  name, 
  type, 
  placeholder, 
  label, 
  icon, 
  register, 
  error 
}) => {
  const Icon = iconMap[icon];
  
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none
            ${error 
              ? "border-red-300 focus:border-red-500 bg-red-50" 
              : "border-gray-200 focus:border-teal-400 bg-white/50"
            } hover:border-teal-300 focus:shadow-lg`}
        />
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