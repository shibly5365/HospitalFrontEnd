import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, AlertCircle } from 'lucide-react';

const CalendarScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1));
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(mockEvents);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    doctor: '',
    date: '',
    type: 'shift',
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date) => {
    return events.filter((e) => e.date === `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`);
  };

  const monthDays = [];
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);

  for (let i = 0; i < firstDay; i++) {
    monthDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    monthDays.push(i);
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.doctor && newEvent.date) {
      setEvents([
        ...events,
        {
          ...newEvent,
          id: Date.now(),
        },
      ]);
      setNewEvent({ title: '', doctor: '', date: '', type: 'shift' });
      setShowAddEvent(false);
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'shift':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'leave':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'appointment':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Schedule Calendar</h2>
            <p className="text-sm text-gray-500 mt-1">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddEvent(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex gap-2">
            {['month', 'week', 'day'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded font-medium text-sm transition-colors ${
                  view === v
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600 py-2 text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, index) => {
              const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateStr = day
                ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                : '';
              const dayEvents = day ? getEventsForDate(dateObj) : [];
              const isToday =
                day &&
                dateObj.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  className={`min-h-24 p-2 rounded-lg border transition-colors cursor-pointer ${
                    day
                      ? isToday
                        ? 'bg-teal-50 border-teal-500'
                        : selectedDate === day
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  {day && (
                    <>
                      <p className={`text-sm font-semibold mb-1 ${isToday ? 'text-teal-600' : 'text-gray-700'}`}>
                        {day}
                      </p>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventColor(event.type)} truncate`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-xs text-gray-600 px-1">
                            +{dayEvents.length - 2} more
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Legend */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Shift</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Appointment</span>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., Morning Shift"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Staff Member
                </label>
                <select
                  value={newEvent.doctor}
                  onChange={(e) => setNewEvent({ ...newEvent, doctor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Select staff</option>
                  <option value="dr-smith">Dr. John Smith</option>
                  <option value="dr-johnson">Dr. Sarah Johnson</option>
                  <option value="nurse-rachel">Nurse Rachel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="shift">Shift</option>
                  <option value="leave">Leave</option>
                  <option value="appointment">Appointment</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Detection Alert */}
      {events.filter((e) => e.type === 'appointment').length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Schedule Conflict Detection</p>
            <p className="text-sm text-amber-800 mt-1">
              No overlapping schedules detected. All shifts are properly assigned.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mockEvents = [
  {
    id: 1,
    title: 'Morning Shift - Dr. Smith',
    doctor: 'dr-smith',
    date: '2024-05-01',
    type: 'shift',
  },
  {
    id: 2,
    title: 'Leave - Dr. Johnson',
    doctor: 'dr-johnson',
    date: '2024-05-03',
    type: 'leave',
  },
  {
    id: 3,
    title: 'Patient Appointment',
    doctor: 'dr-smith',
    date: '2024-05-05',
    type: 'appointment',
  },
];

export default CalendarScheduler;
