import React from "react";
import { AlertCircle, CheckCircle, XCircle, Activity } from "lucide-react";

const AlertCard = ({ type, message, onAction }) => {
  const icons = {
    warning: AlertCircle,
    success: CheckCircle,
    error: XCircle,
    info: Activity,
  };
  const colors = {
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };
  const Icon = icons[type] || Activity;

  return (
    <div className={`rounded-lg border p-4 ${colors[type]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Icon className="w-5 h-5 mt-0.5" />
          <div>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        {onAction && (
          <button onClick={onAction} className="text-sm font-medium underline">
            Take Action
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertCard;