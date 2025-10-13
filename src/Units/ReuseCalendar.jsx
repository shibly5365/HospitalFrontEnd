// components/Calendar/CustomCalendar.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CustomCalendar = ({ events = [] }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={events}
        height="600px"
        dayCellClassNames="border border-gray-200" // Tailwind border for each day
        eventClassNames="bg-blue-500 text-white rounded px-1 py-0.5 text-sm" // Tailwind style for events
      />
    </div>
  );
};

export default CustomCalendar;
