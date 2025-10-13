import React, { useState } from "react";
import { UserPlus, RefreshCcw, MoreHorizontal, Calendar, Laptop, Footprints } from "lucide-react";

const PatientType = ({ onNext }) => {
  const [patientType, setPatientType] = useState("");
  const [visitingType, setVisitingType] = useState("");

  const handleNext = () => {
    if (!patientType || !visitingType) {
      alert("Please select both patient type and visiting type");
      return;
    }

    onNext({ patientType, visitingType });
  };

  const patientOptions = [
    { label: "New Patient", icon: UserPlus },
    { label: "Returning Patient", icon: RefreshCcw },
    { label: "Other", icon: MoreHorizontal },
  ];

  const visitingOptions = [
    { label: "Walk In", icon: Footprints },
    { label: "Scheduled", icon: Calendar },
    { label: "Online", icon: Laptop },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 via-white to-teal-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Patient Type */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Type</h2>
            <div className="flex flex-col gap-4">
              {patientOptions.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setPatientType(label)}
                  className={`flex items-center justify-center gap-3 w-full p-5 rounded-2xl font-semibold transition-all duration-300 transform
                    ${
                      patientType === label
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:shadow-md"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Visiting Type */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Visiting Type</h2>
            <div className="flex flex-col gap-4">
              {visitingOptions.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setVisitingType(label)}
                  className={`flex items-center justify-center gap-3 w-full p-5 rounded-2xl font-semibold transition-all duration-300 transform
                    ${
                      visitingType === label
                        ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:shadow-md"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!patientType || !visitingType}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300
            ${
              patientType && visitingType
                ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PatientType;
