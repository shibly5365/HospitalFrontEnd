import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Stethoscope, Clock, Calendar, CheckCircle, XCircle, Building2, Search } from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function DoctorAvailability() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    selectedDate && fetchAvailability();
  }, [selectedDate, doctors]);

  const fetchDoctors = async () => {
    try {
      const res = await apiClient.get("/receptionist/doctors", { withCredentials: true });
      res.data.success && setDoctors(res.data.data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      notify.error("Failed to load doctors");
    }
  };

  const fetchAvailability = async () => {
    setLoading(true);
    const results = await Promise.all(
      doctors.map(async (doctor) => {
        try {
          const res = await apiClient.get(
            `/receptionist/doctor/${doctor._id}/availability/date`,
            { params: { date: selectedDate }, withCredentials: true }
          );
          return { id: doctor._id, available: res.data.available || false };
        } catch {
          return { id: doctor._id, available: false };
        }
      })
    );

    const availabilityMap = {};
    results.forEach(r => availabilityMap[r.id] = r.available);
    setAvailability(availabilityMap);
    setLoading(false);
  };

  const filteredDoctors = doctors.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.userId?.fullName?.toLowerCase().includes(q) ||
      d.specialization?.toLowerCase().includes(q) ||
      d.department?.name?.toLowerCase().includes(q)
    );
  });

  const availableCount = Object.values(availability).filter(v => v !== false).length;
  const unavailableCount = Object.values(availability).filter(v => v === false).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Stethoscope className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Doctor Availability</h2>
            <p className="text-sm text-gray-500">Check doctor availability by date</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors by name, specialization, or department..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading availability...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No doctors found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map(doctor => {
              const isAvailable = availability[doctor._id] !== false;
              const bgClass = isAvailable
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                : "bg-gradient-to-br from-red-50 to-pink-50 border-red-300";
              const iconClass = isAvailable
                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                : "bg-gradient-to-br from-red-500 to-pink-500";

              return (
                <div key={doctor._id} className={`border-2 rounded-xl p-5 ${bgClass}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${iconClass}`}>
                        {doctor.userId?.fullName?.charAt(0) || "D"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Dr. {doctor.userId?.fullName || "Unknown"}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                    </div>
                    {isAvailable ? <CheckCircle className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 size={16} />
                      <span>{doctor.department?.name || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>Fee: ₹{doctor.consultationFee || 0}</span>
                    </div>
                    <div className="mt-3">
                      <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {isAvailable ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-800">{filteredDoctors.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Not Available</p>
                <p className="text-2xl font-bold text-red-600">{unavailableCount}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}