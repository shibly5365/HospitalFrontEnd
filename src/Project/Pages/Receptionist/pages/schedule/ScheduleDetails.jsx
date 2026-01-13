import React from "react";

const ScheduleDetails = ({
  selectedDoctor,
  availableDates,
  slots,
  selectedDate,
  setSelectedDate,
}) => {
  const deptColors = {
    Cardiology: "bg-gradient-to-r from-rose-50 to-rose-100 text-rose-800 border-rose-200",
    Neurology: "bg-gradient-to-r from-violet-50 to-violet-100 text-violet-800 border-violet-200",
    Orthopedics: "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200",
    Pediatrics: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200",
    Dermatology: "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800 border-pink-200",
    General: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200",
    Radiology: "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 border-indigo-200",
    Oncology: "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200",
    "General Gynecology": "bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 border-teal-200",
  };

  // Format readable date for UI
  const formatDisplayDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  console.log("vvv", selectedDoctor);


  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
        <div className="flex-shrink-0">
          {selectedDoctor?.userId?.profileImage ? (
            <img
              src={selectedDoctor?.userId?.profileImage}
              alt={selectedDoctor?.userId?.fullName}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-4 ring-gray-100 shadow-sm">
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Dr. {selectedDoctor?.userId?.fullName}
            </h2>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${deptColors[selectedDoctor.specialization] ||
                "bg-gray-100 text-gray-800 border-gray-300"
                }`}
            >
              {selectedDoctor.specialization}
            </span>
          </div>

          <p className="text-gray-600 mb-3">{selectedDoctor.experience}</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Select Date
          </h3>

          <div className="flex flex-wrap gap-3">
            {availableDates.length > 0 ? (
              availableDates.map((date, idx) => {
                const formatted = formatDisplayDate(date);

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`px-5 py-3 rounded-xl font-medium transition-all shadow-sm 
                      ${selectedDate === date
                        ? "bg-blue-600 text-white shadow-blue-200"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                  >
                    {formatted}
                  </button>
                );
              })
            ) : (
              <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center">
                <p className="text-gray-600">No dates currently available</p>
              </div>
            )}
          </div>
        </div>

        {/* Slots */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Available Time Slots
            </h3>

            {selectedDate && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>
            )}
          </div>

          {slots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {slots.map((slot, idx) => (
                <button
                  key={idx}
                  disabled={slot.isBooked}
                  className={`p-4 rounded-xl text-center transition-all ${slot.isBooked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    : "bg-gradient-to-br from-green-50 to-emerald-50 text-emerald-800 border border-emerald-200 hover:shadow-md"
                    }`}
                >
                  <div className="font-bold text-lg">{slot.start}</div>
                  <div className="text-sm text-gray-500">to {slot.end}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
              <p className="text-gray-700 font-medium">
                {selectedDate
                  ? "No slots available on this date"
                  : "Select a date to view available time slots"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetails;
