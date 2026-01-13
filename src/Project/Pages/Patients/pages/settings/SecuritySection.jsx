import React, { useState } from "react";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

export default function SecuritySection() {
  const [data, setData] = useState({ current: "", new: "", confirm: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (data.new !== data.confirm) return alert("Passwords do not match!");
    alert("Password updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-8">
          <Lock className="text-rose-600" /> Change Password
        </h2>

        {["current", "new", "confirm"].map((key) => (
          <div key={key} className="relative mb-6">
            <input
              type={show[key] ? "text" : "password"}
              name={key}
              placeholder={`${key === "current" ? "Current" : key === "new" ? "New" : "Confirm"} Password`}
              value={data[key]}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow({ ...show, [key]: !show[key] })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show[key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold"
        >
          Update Password
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-4">
          <Shield className="text-indigo-600" /> Two-Factor Authentication
        </h2>
        <p className="text-gray-600 mb-4">Enable 2FA for extra account protection</p>
        <label className="relative inline-block w-14 h-8">
          <input type="checkbox" className="sr-only peer" />
          <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-indigo-600"></span>
          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
        </label>
      </div>
    </div>
  );
}
