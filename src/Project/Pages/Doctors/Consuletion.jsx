import React from "react";

const patients = [
  { id: "P001", name: "John Doe", image: "https://via.placeholder.com/150" },
  { id: "P002", name: "Jane Smith", image: "https://via.placeholder.com/150" },
  { id: "P003", name: "Michael Lee", image: "https://via.placeholder.com/150" },
];

const ConsultationList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="p-4 flex flex-col items-center shadow-lg rounded-2xl bg-white"
        >
          {/* Patient Image */}
          <img
            src={patient.image}
            alt={patient.name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />

          {/* Patient ID */}
          <p className="text-lg font-semibold mb-4">ID: {patient.id}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              View
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Video Call
            </button>
          </div>

          {/* Reschedule Button */}
          <button className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Reschedule
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConsultationList;
