import React from "react";

const Confirmation = ({ formData, onConfirm, onBack, loading }) => {
  const { details, timeSlot, doctor, department, patientType, visitingType } = formData;

  if (!details) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Confirm Appointment</h2>

      <div className="space-y-2 mb-6">
        <p><strong>Patient Type:</strong> {patientType}</p>
        <p><strong>Visiting Type:</strong> {visitingType}</p>
        <p><strong>Department:</strong> {department?.name || "Selected Dept"}</p>
        <p><strong>Doctor:</strong> {doctor?.fullName || "Selected Doctor"}</p>
        <p><strong>Slot:</strong> {timeSlot?.date} at {timeSlot?.start}</p>
        <p><strong>Patient:</strong> {details.fullName}, {details.age} ({details.gender})</p>
        <p><strong>Contact:</strong> {details.phone}</p>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 border rounded-lg text-gray-600">
          Previous
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Confirm Appointment"}
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
