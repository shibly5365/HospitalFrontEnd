import React from "react";

const TodayAppointments = () => {
  const appointments = [
    { name: "M.J. Micai", diagnosis: "Eye Checkup", time: "12:30 PM" },
    { name: "Sanath Deo", diagnosis: "Health Checkup", time: "01:00 PM" },
    { name: "Locara Phanj", diagnosis: "Report", time: "01:30 PM" },
    { name: "Komola Haris", diagnosis: "Common Cold", time: "02:00 PM" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Today Appointment</h3>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{appointment.name}</p>
              <p className="text-xs text-gray-500">{appointment.diagnosis}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                On Going
              </span>
              <p className="text-xs text-gray-500 mt-1">{appointment.time}</p>
            </div>
          </div>
        ))}
        <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 text-center">
          See All
        </button>
      </div>
    </div>
  );
};

export default TodayAppointments;