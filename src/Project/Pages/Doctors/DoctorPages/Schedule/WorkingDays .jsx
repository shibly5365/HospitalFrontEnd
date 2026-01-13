import React, { useState, useEffect } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Circular Progress Chart Component
const CircularProgressChart = ({ percentage, color, size = 100, label, value, subLabel }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-xs text-gray-500">{label}</div>
            {subLabel && <div className="text-xs text-gray-400 mt-1">{subLabel}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Slot Availability Card Component
const SlotCard = ({ day, slots, bookedSlots, availableSlots, totalSlots, workingHours }) => {
  const utilization = totalSlots > 0 ? (bookedSlots / totalSlots) * 100 : 0;
  
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-blue-800 text-lg">{day}</h4>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
          {workingHours}h
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Slots</span>
          <span className="font-semibold text-gray-800">{totalSlots}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Booked</span>
          <span className="font-semibold text-red-600">{bookedSlots}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Available</span>
          <span className="font-semibold text-green-600">{availableSlots}</span>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Utilization</span>
            <span>{utilization.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${utilization}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Weekly Calendar View Component
const WeeklyCalendar = ({ selectedDays, slots, bookedData }) => {
  const getBookedSlotsForDay = (day) => {
    return bookedData?.[day] || { booked: 0, available: 8, total: 8 };
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Weekly Schedule Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {days.map((day) => {
          const isWorking = selectedDays.includes(day);
          const dayData = getBookedSlotsForDay(day);
          const daySlots = slots[day] || [];
          const workingHours = daySlots.reduce((total, slot) => {
            if (slot.start && slot.end) {
              const start = new Date(`1970-01-01T${slot.start}`);
              const end = new Date(`1970-01-01T${slot.end}`);
              return total + (end - start) / (1000 * 60 * 60);
            }
            return total;
          }, 0);

          return (
            <div 
              key={day} 
              className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                isWorking 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-sm' 
                  : 'bg-gray-100 border-gray-300 opacity-75'
              }`}
            >
              <div className="text-center mb-3">
                <div className={`font-semibold ${
                  isWorking ? 'text-green-800' : 'text-gray-500'
                }`}>
                  {day.substring(0, 3)}
                </div>
                <div className={`text-xs ${
                  isWorking ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {isWorking ? 'Working' : 'Off'}
                </div>
              </div>
              
              {isWorking && (
                <div className="space-y-2">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700">{workingHours.toFixed(1)}h</div>
                    <div className="text-xs text-gray-500">Working</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="text-center p-1 bg-blue-100 rounded">
                      <div className="font-semibold text-blue-700">{dayData.booked}</div>
                      <div className="text-blue-600">Booked</div>
                    </div>
                    <div className="text-center p-1 bg-green-100 rounded">
                      <div className="font-semibold text-green-700">{dayData.available}</div>
                      <div className="text-green-600">Available</div>
                    </div>
                  </div>
                  
                  {daySlots.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {daySlots.map((slot, index) => (
                        <div 
                          key={index}
                          className="bg-white border border-blue-200 rounded px-2 py-1 text-xs text-blue-700 font-medium text-center"
                        >
                          {slot.start} - {slot.end}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WorkingDaysSlots = ({ onChange, initialData, bookedSlotsData }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [slots, setSlots] = useState({});
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [activeTab, setActiveTab] = useState("availability");

  // Sample booked slots data
  const sampleBookedData = {
    Monday: { booked: 12, available: 4, total: 16 },
    Tuesday: { booked: 8, available: 8, total: 16 },
    Wednesday: { booked: 15, available: 1, total: 16 },
    Thursday: { booked: 6, available: 10, total: 16 },
    Friday: { booked: 14, available: 2, total: 16 },
    Saturday: { booked: 4, available: 12, total: 16 },
    Sunday: { booked: 0, available: 0, total: 0 }
  };

  const bookedData = bookedSlotsData || sampleBookedData;

  // Initialize with initial data if provided
  useEffect(() => {
    if (initialData) {
      setSelectedDays(initialData.selectedDays || []);
      setSlots(initialData.slots || {});
    }
  }, [initialData]);

  // Calculate weekly hours whenever slots change
  useEffect(() => {
    calculateWeeklyHours();
  }, [slots, selectedDays]);

  const calculateWeeklyHours = () => {
    let totalMinutes = 0;
    Object.values(slots).forEach(daySlots => {
      daySlots.forEach(slot => {
        if (slot.start && slot.end) {
          const start = new Date(`1970-01-01T${slot.start}`);
          const end = new Date(`1970-01-01T${slot.end}`);
          totalMinutes += (end - start) / (1000 * 60);
        }
      });
    });
    setWeeklyHours(Math.round((totalMinutes / 60) * 100) / 100);
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      const updated = prev.includes(day) 
        ? prev.filter((d) => d !== day) 
        : [...prev, day];
      
      if (!updated.includes(day)) {
        setSlots(prev => {
          const { [day]: removed, ...rest } = prev;
          return rest;
        });
      }
      
      if (onChange) onChange({ selectedDays: updated, slots });
      return updated;
    });
  };

  const addSlot = (day) => {
    setSlots((prev) => {
      const daySlots = prev[day] || [];
      const updated = { ...prev, [day]: [...daySlots, { start: "09:00", end: "17:00" }] };
      if (onChange) onChange({ selectedDays, slots: updated });
      return updated;
    });
  };

  const handleSlotChange = (day, index, field, value) => {
    setSlots((prev) => {
      const daySlots = [...(prev[day] || [])];
      daySlots[index][field] = value;
      
      if (field === "start" && daySlots[index].end && value > daySlots[index].end) {
        daySlots[index].end = value;
      } else if (field === "end" && daySlots[index].start && value < daySlots[index].start) {
        daySlots[index].start = value;
      }
      
      const updated = { ...prev, [day]: daySlots };
      if (onChange) onChange({ selectedDays, slots: updated });
      return updated;
    });
  };

  const removeSlot = (day, index) => {
    setSlots((prev) => {
      const daySlots = [...(prev[day] || [])];
      daySlots.splice(index, 1);
      const updated = { ...prev, [day]: daySlots };
      if (onChange) onChange({ selectedDays, slots: updated });
      return updated;
    });
  };

  const getDayHours = (day) => {
    const daySlots = slots[day] || [];
    let totalMinutes = 0;
    daySlots.forEach(slot => {
      if (slot.start && slot.end) {
        const start = new Date(`1970-01-01T${slot.start}`);
        const end = new Date(`1970-01-01T${slot.end}`);
        totalMinutes += (end - start) / (1000 * 60);
      }
    });
    return Math.round((totalMinutes / 60) * 100) / 100;
  };

  // Calculate statistics for charts
  const calculateStatistics = () => {
    const totalSlots = Object.values(bookedData).reduce((sum, day) => sum + day.total, 0);
    const totalBooked = Object.values(bookedData).reduce((sum, day) => sum + day.booked, 0);
    const totalAvailable = Object.values(bookedData).reduce((sum, day) => sum + day.available, 0);
    const utilizationRate = totalSlots > 0 ? (totalBooked / totalSlots) * 100 : 0;
    
    const workingDays = selectedDays.length;
    const weeklyUtilization = (workingDays / 7) * 100;

    return {
      totalSlots,
      totalBooked,
      totalAvailable,
      utilizationRate: utilizationRate.toFixed(1),
      workingDays,
      weeklyUtilization: weeklyUtilization.toFixed(1)
    };
  };

  const stats = calculateStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">👨‍⚕️ Doctor's Dashboard</h1>
                <p className="text-blue-100 opacity-90">Manage your availability and track appointments</p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.workingDays}/7 Days</div>
                  <div className="text-blue-100 text-sm">Weekly Working</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("availability")}
                className={`flex-1 px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "availability"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                📅 Availability & Slots
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex-1 px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "analytics"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                📊 Slot Analytics
              </button>
            </div>
          </div>

          {/* Availability Tab */}
          {activeTab === "availability" && (
            <div className="p-6 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold">{stats.workingDays}</div>
                  <div className="text-blue-100">Working Days</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold">{stats.totalAvailable}</div>
                  <div className="text-green-100">Available Slots</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold">{stats.totalBooked}</div>
                  <div className="text-orange-100">Booked Slots</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold">{stats.utilizationRate}%</div>
                  <div className="text-purple-100">Utilization</div>
                </div>
              </div>

              {/* Weekly Calendar */}
              <WeeklyCalendar 
                selectedDays={selectedDays} 
                slots={slots}
                bookedData={bookedData}
              />

              {/* Days Selection */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Select Working Days</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                        selectedDays.includes(day) 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg" 
                          : "bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Management */}
              {selectedDays.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Manage Time Slots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedDays.map((day) => (
                      <div key={day} className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-blue-800 text-lg">{day}</h4>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {getDayHours(day)}h
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {(slots[day] || []).map((slot, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-blue-100">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-xs text-gray-500 block mb-1">Start</label>
                                  <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => handleSlotChange(day, index, "start", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-500 block mb-1">End</label>
                                  <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => handleSlotChange(day, index, "end", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => removeSlot(day, index)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                title="Remove slot"
                              >
                                🗑️
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => addSlot(day)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <span>+</span>
                          Add Time Slot
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="p-6 space-y-8">
              {/* Circular Charts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <CircularProgressChart
                  percentage={parseFloat(stats.weeklyUtilization)}
                  color="#10b981"
                  size={140}
                  label="Weekly Utilization"
                  value={`${stats.weeklyUtilization}%`}
                  subLabel={`${stats.workingDays}/7 days`}
                />
                <CircularProgressChart
                  percentage={parseFloat(stats.utilizationRate)}
                  color="#3b82f6"
                  size={140}
                  label="Slot Utilization"
                  value={`${stats.utilizationRate}%`}
                  subLabel={`${stats.totalBooked}/${stats.totalSlots} slots`}
                />
                <CircularProgressChart
                  percentage={(stats.totalAvailable / stats.totalSlots) * 100}
                  color="#f59e0b"
                  size={140}
                  label="Availability Rate"
                  value={`${((stats.totalAvailable / stats.totalSlots) * 100).toFixed(1)}%`}
                  subLabel={`${stats.totalAvailable} available`}
                />
                <CircularProgressChart
                  percentage={weeklyHours > 40 ? 100 : (weeklyHours / 40) * 100}
                  color="#8b5cf6"
                  size={140}
                  label="Weekly Hours"
                  value={`${weeklyHours}h`}
                  subLabel="of 40h capacity"
                />
              </div>

              {/* Slot Cards Grid */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Slot Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedDays.map((day) => {
                    const dayData = bookedData[day] || { booked: 0, available: 0, total: 0 };
                    return (
                      <SlotCard
                        key={day}
                        day={day}
                        slots={slots[day] || []}
                        bookedSlots={dayData.booked}
                        availableSlots={dayData.available}
                        totalSlots={dayData.total}
                        workingHours={getDayHours(day)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Weekly Performance</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Working Hours</span>
                      <span className="font-bold text-xl">{weeklyHours}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Daily Hours</span>
                      <span className="font-bold text-xl">{(weeklyHours / stats.workingDays).toFixed(1)}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Peak Utilization Day</span>
                      <span className="font-bold text-xl">
                        {Object.entries(bookedData).reduce((maxDay, [day, data]) => 
                          data.total > 0 && (data.booked / data.total) > (bookedData[maxDay]?.booked / bookedData[maxDay]?.total || 0) ? day : maxDay, 'Monday'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Slot Efficiency</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Overall Efficiency</span>
                      <span className="font-bold text-xl">{stats.utilizationRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Best Performing Day</span>
                      <span className="font-bold text-xl">
                        {Object.entries(bookedData).reduce((bestDay, [day, data]) => 
                          data.booked > (bookedData[bestDay]?.booked || 0) ? day : bestDay, 'Monday'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available Capacity</span>
                      <span className="font-bold text-xl">{stats.totalAvailable} slots</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkingDaysSlots;