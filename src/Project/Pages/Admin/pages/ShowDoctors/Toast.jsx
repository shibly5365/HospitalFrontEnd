import React, { useEffect } from "react";
import { UserCheck, AlertCircle, X } from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up`}
    >
      {type === "success" && <UserCheck size={18} />}
      {type === "error" && <AlertCircle size={18} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-80">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
