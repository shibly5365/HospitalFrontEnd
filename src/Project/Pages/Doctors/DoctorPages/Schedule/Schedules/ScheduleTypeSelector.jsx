import React from "react";

const weekDays = [
  { id: 1, name: "Monday", short: "Mon" },
  { id: 2, name: "Tuesday", short: "Tue" },
  { id: 3, name: "Wednesday", short: "Wed" },
  { id: 4, name: "Thursday", short: "Thu" },
  { id: 5, name: "Friday", short: "Fri" },
  { id: 6, name: "Saturday", short: "Sat" },
  { id: 0, name: "Sunday", short: "Sun" }
];

const ScheduleTypeSelector = ({
  isRecurring,
  setIsRecurring,
  selectedDate,
  setSelectedDate,
  recurringDays,
  setRecurringDays
}) => {
  const toggleRecurringDay = (day) => {
    setRecurringDays(prev =>
      prev.find(d => d.id === day.id)
        ? prev.filter(d => d.id !== day.id)
        : [...prev, day]
    );
  };

  return (
    <>
     
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setIsRecurring(false)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 text-center transition-all ${
            !isRecurring
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Specific Date
        </button>
        <button
          type="button"
          onClick={() => setIsRecurring(true)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 text-center transition-all ${
            isRecurring
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Recurring Weekly
        </button>
      </div>

     
      {!isRecurring ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Days of Week
          </label>
          <div className="grid grid-cols-4 gap-2">
            {weekDays.map(day => (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleRecurringDay(day)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  recurringDays.find(d => d.id === day.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {day.short}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleTypeSelector;