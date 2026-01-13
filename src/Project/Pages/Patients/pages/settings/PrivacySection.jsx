import React from "react";
import { Shield, Trash2, LogOut, Download } from "lucide-react";

export default function PrivacySection() {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to permanently delete your account?")) {
      alert("Account deletion process started.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-6">
          <Shield className="text-purple-600" /> Privacy Settings
        </h2>
        <div className="flex items-center justify-between bg-purple-50 p-5 rounded-2xl border border-purple-200">
          <div>
            <p className="font-semibold text-gray-800">Private Profile</p>
            <p className="text-sm text-gray-600">Make your profile visible only to you</p>
          </div>
          <label className="relative inline-block w-14 h-8">
            <input type="checkbox" className="sr-only peer" />
            <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-purple-500"></span>
            <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
          </label>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2 mb-6">
          <Trash2 className="w-6 h-6" /> Danger Zone
        </h2>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-gray-800 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900">
            <Download className="w-5 h-5" /> Download My Data
          </button>
          <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700">
            <LogOut className="w-5 h-5" /> Log Out All Devices
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-700"
          >
            <Trash2 className="w-5 h-5" /> Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
