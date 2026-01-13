import React from 'react';
import { ClipboardList } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Prescription History</h1>
            <p className="text-gray-600 mt-1">Dr. John Smith - General Physician</p>
          </div>
          <div className="bg-blue-100 rounded-full p-4">
            <ClipboardList className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;