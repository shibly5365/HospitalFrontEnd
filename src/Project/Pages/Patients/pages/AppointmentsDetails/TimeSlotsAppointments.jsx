export default function TimeSlotsAppointments({ selectedTime, onSelect, slots = [] }) {
  console.log(selectedTime);
  
  if (!slots.length)
    return <div className="text-gray-400 mt-2">No slots available</div>;

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {slots.map((time) => (
        <button
          key={time}
          className={`py-2 px-3 rounded-lg border ${
            selectedTime === time
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-purple-50"
          }`}
          onClick={() => onSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
