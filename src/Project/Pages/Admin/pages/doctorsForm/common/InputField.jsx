import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const InputField = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  ...props
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
        <FaExclamationCircle /> {error}
      </p>
    )}
  </div>
);

export default InputField;
