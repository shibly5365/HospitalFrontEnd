import React from "react";

const DoctorsGrid = ({ doctors, search, department, onSelectDoctor }) => {
  const deptColors = {
    Cardiology: "bg-rose-50 text-rose-700 border-rose-200",
    Neurology: "bg-violet-50 text-violet-700 border-violet-200",
    Orthopedics: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pediatrics: "bg-amber-50 text-amber-700 border-amber-200",
    Dermatology: "bg-pink-50 text-pink-700 border-pink-200",
    General: "bg-blue-50 text-blue-700 border-blue-200",
    Radiology: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Oncology: "bg-orange-50 text-orange-700 border-orange-200",
    "General Gynecology": "bg-teal-50 text-teal-700 border-teal-200",
  };

  const filtered = doctors.filter(doc => {
    const deptMatch = department === "All" || doc.specialization === department;
    const searchMatch = doc.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(search.toLowerCase());
    return deptMatch && searchMatch;
  });
  console.log("filte", filtered);


  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Available Doctors</h2>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium">
          {filtered.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(doctor => (
            <button
              key={doctor._id}
              onClick={() => onSelectDoctor(doctor)}
              className="text-left bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 shadow-sm hover:shadow-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30"
            >
              <div className="flex items-start gap-5">
                <div className="relative flex-shrink-0">
                  {doctor?.userId?.profileImage ? (
                    <img src={doctor?.userId?.profileImage} alt={doctor?.userId?.name} className="w-18 h-18 rounded-xl object-cover ring-4 ring-gray-50" />
                  ) : (
                    <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-4 ring-gray-50">
                      <svg className="w-9 h-9 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Dr. {doctor?.userId?.fullName}</h3>
                  <p className="text-gray-600 text-sm mb-3">{doctor.specialization} </p>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${deptColors[doctor.specialization] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
                    {doctor?.department.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsGrid;