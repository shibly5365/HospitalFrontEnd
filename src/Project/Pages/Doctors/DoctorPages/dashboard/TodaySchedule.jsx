import React from "react";
import { ChevronRight } from "lucide-react";

const TodaySchedule = () => {
  const todayAppointments = [
    {
      id: 1,
      patientName: "Arjun Sharma",
      patientAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      type: "New Consultation",
      time: new Date(),
      status: "Confirmed",
      duration: "30 min",
    },
    {
      id: 2,
      patientName: "Meera Nair",
      patientAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
      type: "Review",
      time: new Date(Date.now() + 7200000),
      status: "Pending",
      duration: "20 min",
    },
    {
      id: 3,
      patientName: "Vikram Singh",
      patientAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
      type: "Follow-up",
      time: new Date(Date.now() + 14400000),
      status: "Confirmed",
      duration: "15 min",
    },
  ];

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] overflow-hidden">
      <div className="px-7 py-5 border-b border-[var(--line)] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Today's Schedule
          </h2>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            You have {todayAppointments.length} appointments today
          </p>
        </div>
        <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {todayAppointments.map((appt) => (
          <div
            key={appt.id}
            className="px-7 py-5 hover:bg-[var(--surface-soft)] transition-all group"
          >
            <div className="flex items-center gap-4">
              <img
                src={appt.patientAvatar}
                className="w-14 h-14 rounded-xl object-cover"
                alt=""
              />
              <div className="flex-1">
                <p className="font-semibold">{appt.patientName}</p>
                <p className="text-sm text-[var(--muted)]">
                  {appt.type} • {appt.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-medium">
                  {appt.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${appt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {appt.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
