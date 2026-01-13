import React from "react";
import { CreditCard, Download } from "lucide-react";

export default function Header({ onExport }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
        <p className="text-gray-600">Manage and track all payment transactions</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download size={18} />
          Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
          <CreditCard size={18} />
          New Payment
        </button>
      </div>
    </div>
  );
}