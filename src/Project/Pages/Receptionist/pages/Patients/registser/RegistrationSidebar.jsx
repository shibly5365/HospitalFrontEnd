import React from "react";
import { User, Home, Stethoscope, Phone, Shield } from "lucide-react";

const iconMap = {
  User: <User size={18} />,
  Home: <Home size={18} />,
  Stethoscope: <Stethoscope size={18} />,
  Phone: <Phone size={18} />,
  Shield: <Shield size={18} />,
};

export default function RegistrationSidebar({ sections, activeSection, onSectionChange }) {
  const progressPercentage = Math.floor(
    (sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100
  );

  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 sticky top-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">
          Registration Steps
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {iconMap[section.icon]}
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-semibold text-teal-600">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}