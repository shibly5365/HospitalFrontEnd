import React from "react";

const AppointmentRequests = () => {
  const requests = [
    { name: "Maria Sarafat", service: "Cold" },
    { name: "Jhon Deo", service: "Over switing" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Appointment Request</h3>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{request.name}</p>
              <p className="text-xs text-gray-500">{request.service}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                Accept
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentRequests;