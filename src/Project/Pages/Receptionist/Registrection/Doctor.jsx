import React, { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";

const Doctor = ({ selectedDept, onNext, onBack }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDept) return;

    setLoading(true);

    fetch(`http://localhost:4002/api/admin/getalldoctorDepartments/${selectedDept}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        console.log("Raw response status:", res.status);
        const data = await res.json();
        console.log("Parsed data:", data);
        return data;
      })
      .then((data) => {
        setDoctors(data.doctors || []); // 👈 only store doctors array
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      })
      .finally(() => setLoading(false));
  }, [selectedDept]);

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Select a Doctor</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-3 text-gray-600 font-medium">Loading doctors...</span>
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No doctors found for this department.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => setSelectedDoctor(doctor._id)}
              className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border 
                ${
                  selectedDoctor === doctor._id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-blue-50 hover:shadow-md text-gray-700"
                }`}
            >
              <User className="w-6 h-6" />
              <div>
                <p className="font-semibold">{doctor?.userId?.fullName}</p>
                <p className="text-sm opacity-80">{doctor?.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={() => onNext(selectedDoctor)} // 👈 pass doctorId to next step
          disabled={!selectedDoctor}
          className={`px-6 py-2 rounded-lg font-semibold transition-all 
            ${
              selectedDoctor
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Doctor;
