import React, { useState } from "react";
import { Settings, User, Lock, Bell, Shield } from "lucide-react";
import {motion, AnimatePresence } from "framer-motion";
import ProfileSection from "./pages/settings/ProfileSection";
import SecuritySection from "./pages/settings/SecuritySection";
import PreferencesSection from "./pages/settings/PreferencesSection";
import PrivacySection from "./pages/settings/PrivacySection";

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl mb-4"
          >
            <Settings className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your profile, security & preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-between">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex justify-center items-center gap-2 py-4 font-semibold rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "security" && <SecuritySection />}
            {activeTab === "preferences" && <PreferencesSection />}
            {activeTab === "privacy" && <PrivacySection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
