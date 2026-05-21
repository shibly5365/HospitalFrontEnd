import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Search, Phone, Award, Calendar, Clock, Filter, Users, ChevronRight, CheckCircle, Star, MapPin, Briefcase, User } from "lucide-react";
import { notify } from "../../../../../units/notification";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchDoctors(); }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/receptionist/doctors", { withCredentials: true });
      if (res.data.success) {
        const fetchedDoctors = res.data.data?.doctors || [];
        setDoctors(fetchedDoctors);
        if (fetchedDoctors.length > 0) fetchAvailability(fetchedDoctors[0]._id);
      }
    } catch (err) {
      console.error("Error:", err);
      notify.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (doctorId) => {
    try {
      const res = await apiClient.get(`/patient/doctor/${doctorId}/available-dates`,
        { withCredentials: true }
      );
      console.log("Availability API Response:", res.data);

      setAvailability(res.data.availableDates);
      setSelectedDoctor(doctorId);

    } catch (err) {
      console.error("Error:", err);
      notify.error("Failed to load availability");
    }
  };
  console.log(availability);


  const departments = ["all", ...new Set(doctors.map(d => d.department?.name).filter(Boolean))];
  const filteredDoctors = doctors.filter(d => {
    if (search && !d.userId?.fullName?.toLowerCase().includes(search.toLowerCase()) &&
      !d.specialization?.toLowerCase().includes(search.toLowerCase()) &&
      !d.department?.name?.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedDept !== "all" && d.department?.name !== selectedDept) return false;
    return true;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get day of week from date
  const getDayOfWeek = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Check if date is today
  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toDateString();
    const date = new Date(dateString).toDateString();
    return today === date;
  };

  // Check if date is tomorrow
  const isTomorrow = (dateString) => {
    if (!dateString) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString() === new Date(dateString).toDateString();
  };

  // Get next available date
  const getNextAvailableDate = () => {
    if (availability.length === 0) return null;

    const today = new Date();
    const nextDate = availability.find(dateObj => {
      const date = new Date(dateObj.date || dateObj);
      return date >= today;
    });

    if (!nextDate) return null;

    const dateStr = nextDate.date || nextDate;
    return {
      date: dateStr,
      formattedDate: formatDate(dateStr),
      day: getDayOfWeek(dateStr),
      isToday: isToday(dateStr),
      isTomorrow: isTomorrow(dateStr)
    };
  };

  console.log("Availability data:", availability);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Team</h1>
              <p className="text-gray-600">Find and connect with our specialists</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900">{doctors.length}</span>
              <span className="text-gray-600 text-sm">Total Doctors</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-semibold text-green-600">{doctors.filter(d => d.status === 'available').length}</span>
              <span className="text-gray-600 text-sm">Available Now</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-semibold text-purple-600">{departments.length - 1}</span>
              <span className="text-gray-600 text-sm">Departments</span>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search doctors, specialization, or department..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm">
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Doctors List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Specialist Doctors <span className="text-gray-500 text-sm font-normal">({filteredDoctors.length})</span>
              </h2>
              {filteredDoctors.length > 0 && (
                <span className="text-sm text-gray-500">
                  Sorted by availability
                </span>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading doctors...</p>
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => {
                  const isSelected = selectedDoctor === doctor._id;
                  const nextDate = getNextAvailableDate();

                  return (
                    <div key={doctor._id} onClick={() => fetchAvailability(doctor._id)}
                      className={`bg-white rounded-xl p-5 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md group
                        ${isSelected ? 'border-blue-500 shadow-blue-100' : 'border-gray-200 hover:border-blue-300'}`}>

                      <div className="flex items-start gap-4">
                        {/* Doctor Avatar */}
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {doctor.userId?.fullName?.charAt(0) || "D"}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center
                            ${doctor.status === 'available' ? 'bg-green-500' : 'bg-gray-400'}`}>
                            <User size={10} className="text-white" />
                          </div>
                        </div>

                        {/* Doctor Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                                  Dr. {doctor.userId?.fullName}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                                  ${doctor.status === 'available' ? 'bg-green-100 text-green-800' :
                                    doctor.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-600'}`}>
                                  <CheckCircle size={10} /> {doctor.status}
                                </span>
                              </div>

                              <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>

                              {/* Doctor Information */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                  <Award size={14} className="text-purple-500" />
                                  <span className="font-medium">{doctor.department?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase size={14} className="text-amber-500" />
                                  <span>{doctor.experienceYears || '0'} years experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone size={14} className="text-emerald-500" />
                                  <span className="font-bold">₹{doctor.consultationFee}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                  <span>4.8 • 120 reviews</span>
                                </div>
                              </div>

                              {/* Next Available Date */}
                              {isSelected && nextDate && (
                                <div className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                                  <Calendar size={14} />
                                  <span>Next available: <span className="font-semibold">
                                    {nextDate.isToday ? 'Today' : nextDate.isTomorrow ? 'Tomorrow' : nextDate.day}
                                  </span></span>
                                </div>
                              )}
                            </div>

                            {/* View Details */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-blue-600 font-medium hidden sm:block">View Schedule</span>
                              <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Doctors Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

          {/* Availability Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="text-blue-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Available Dates</h3>
                  <p className="text-sm text-gray-500">Schedule appointments</p>
                </div>
                {availability.length > 0 && (
                  <span className="ml-auto text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {availability.length} date{availability.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {selectedDoctor ? (
                availability.length > 0 ? (
                  <div className="space-y-4">
                    {/* Doctor Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {doctors.find(d => d._id === selectedDoctor)?.userId?.fullName?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Selected Doctor</p>
                          <p className="font-bold text-gray-900">
                            Dr. {doctors.find(d => d._id === selectedDoctor)?.userId?.fullName}
                          </p>
                          <p className="text-sm text-blue-600">
                            {doctors.find(d => d._id === selectedDoctor)?.specialization}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dates List */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {availability.map((dateItem, index) => {
                        const dateStr = dateItem.date || dateItem;
                        const formattedDate = formatDate(dateStr);
                        const dayOfWeek = getDayOfWeek(dateStr);
                        const isTodayDate = isToday(dateStr);
                        const isTomorrowDate = isTomorrow(dateStr);

                        return (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors group">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-600" />
                                <div>
                                  <span className="font-semibold text-gray-900 block">
                                    {isTodayDate ? 'Today' : isTomorrowDate ? 'Tomorrow' : dayOfWeek}
                                  </span>
                                  <span className="text-xs text-gray-500">{formattedDate}</span>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium
                                ${isTodayDate ? 'bg-green-100 text-green-800' :
                                  isTomorrowDate ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-600'}`}>
                                {isTodayDate ? 'Today' : isTomorrowDate ? 'Tomorrow' : 'Available'}
                              </span>
                            </div>

                            {/* If there are time slots within the date */}
                            {dateItem.slots && Array.isArray(dateItem.slots) && dateItem.slots.length > 0 && (
                              <div className="mt-3">
                                <div className="text-xs text-gray-500 mb-2">Available slots:</div>
                                <div className="flex flex-wrap gap-2">
                                  {dateItem.slots.map((slot, slotIndex) => (
                                    <span key={slotIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                      {slot.startTime} - {slot.endTime}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
                      Book Appointment
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Calendar className="text-gray-400" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Available Dates</h4>
                    <p className="text-gray-500 mb-4">This doctor has no available dates</p>
                    <button onClick={() => fetchAvailability(selectedDoctor)} className="text-blue-600 text-sm font-medium">
                      Refresh availability
                    </button>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Select a Doctor</h4>
                  <p className="text-gray-500">Choose a doctor to view their available dates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}