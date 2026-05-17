import React from "react";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <Icon size={18} className="text-gray-400" />
    <span className="text-sm text-gray-500 w-28">{label}</span>
    <span className="text-sm text-gray-800 font-medium">{value}</span>
  </div>
);

export default InfoRow;