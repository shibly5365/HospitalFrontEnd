import React from "react";
import { Phone, FileText } from "lucide-react";

const NextPatient = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Next Patient Details</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="Patient"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-bold text-gray-800">Sanath Deo</p>
            <p className="text-sm text-gray-500">Health Checkup</p>
            <p className="text-xs text-gray-400">Patient ID: 0220092020005</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Sex</p>
            <p className="font-semibold text-gray-800">Male</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Age</p>
            <p className="font-semibold text-gray-800">29</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Weight</p>
            <p className="font-semibold text-gray-800">59 Kg</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Height</p>
            <p className="font-semibold text-gray-800">172 cm</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Patient History</p>
            <p className="font-semibold text-gray-800">Normal</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Reg. Date</p>
            <p className="font-semibold text-gray-800">10 Dec 2021</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-blue-700">
            <Phone size={14} />
            (289) 555-0102
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200">
            <FileText size={14} />
            Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextPatient;