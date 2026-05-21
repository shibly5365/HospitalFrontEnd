import React, { useState } from "react";
import { Palette, Sun, Moon, Save, Mail, Lock, User, Bell } from "lucide-react";
import { notify } from "../../../UnitsTemp/notification";

const accentOptions = [
  { name: "Slate", value: "#1f2937" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
];

function SuperAdminSettings() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState(accentOptions[0].value);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
  });

  const handleProfileSave = () => {
    // TODO: connect to backend profile update endpoint
    notify.success("Profile updated");
  };

  const handlePasswordSave = () => {
    if (passwords.newPass !== passwords.confirm) {
      notify.error("New passwords do not match");
      return;
    }
    // TODO: connect to backend password update endpoint
    notify.success("Password updated");
  };

  const handleThemeApply = () => {
    document.documentElement.style.setProperty("--accent-color", accent);
    document.documentElement.dataset.theme = theme;
    notify.success("Theme updated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Settings & Profile
        </h1>
        <p className="text-gray-600">
          Manage profile, security, notifications, and theme.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleProfileSave}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="Current password"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  type="password"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="New password"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="text-sm text-gray-600 hover:text-gray-800">
                Forgot password?
              </button>
              <button
                onClick={handlePasswordSave}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Theme & Colors</h2>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                theme === "light" ? "border-gray-800 text-gray-800" : "border-gray-300"
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                theme === "dark" ? "border-gray-800 text-gray-800" : "border-gray-300"
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {accentOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAccent(opt.value)}
                className={`h-10 rounded-lg border ${
                  accent === opt.value ? "border-gray-800" : "border-gray-200"
                }`}
                style={{ backgroundColor: opt.value }}
                title={opt.name}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleThemeApply}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Save className="w-4 h-4" />
              Apply Theme
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
              <span className="text-gray-700">Email notifications</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) =>
                  setNotifications({ ...notifications, email: e.target.checked })
                }
                className="h-5 w-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
              <span className="text-gray-700">System alerts</span>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) =>
                  setNotifications({ ...notifications, push: e.target.checked })
                }
                className="h-5 w-5"
              />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => notify.success("Notification preferences saved")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminSettings;

