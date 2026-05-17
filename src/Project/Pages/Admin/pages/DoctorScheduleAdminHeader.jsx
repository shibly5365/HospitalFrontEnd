import React, { useState } from 'react';
import {
  Search,
  Bell,
  AlertTriangle,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

const Header = ({
  emergencyMode,
  onEmergencyModeChange,
  unreadNotifications = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Staff Control Center</h1>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search staff, schedules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Emergency Mode Button */}
          <button
            onClick={() => onEmergencyModeChange(!emergencyMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              emergencyMode
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {emergencyMode ? 'Emergency Active' : 'Emergency Mode'}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <hr className="my-1" />
                <button className="w-full flex items-center gap-2 px-4 py-2 text-red-700 hover:bg-red-50 text-left">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
