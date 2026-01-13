import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    push: true,
    email: true,
    sms: false,
  });

  const toggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const items = [
    { key: "push", title: "Push Notifications", desc: "Appointment and report alerts" },
    { key: "email", title: "Email Notifications", desc: "Get updates via email" },
    { key: "sms", title: "SMS Notifications", desc: "Receive message alerts" },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 mb-8">
        <Bell className="text-blue-600" /> Notification Preferences
      </h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center p-5 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-block w-14 h-8">
              <input type="checkbox" checked={prefs[item.key]} onChange={() => toggle(item.key)} className="sr-only peer" />
              <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-blue-500"></span>
              <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
