import React from "react";

const AppointmentRequests = () => {
  const appointmentRequests = [
    {
      id: 1,
      patientName: "Anita Desai",
      patientAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
      preferredDate: "25 May 2026",
      reason: "Severe headache and blurred vision",
      priority: "High",
    },
    {
      id: 2,
      patientName: "Rohan Mehta",
      patientAvatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop",
      preferredDate: "26 May 2026",
      reason: "Persistent cough and fever",
      priority: "Medium",
    },
    {
      id: 3,
      patientName: "Sunita Reddy",
      patientAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
      preferredDate: "27 May 2026",
      reason: "Follow-up for blood pressure",
      priority: "Low",
    },
  ];

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--line)] flex justify-between items-center">
        <h2 className="text-lg font-semibold">Appointment Requests</h2>
        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
          3 New
        </span>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {appointmentRequests.map((req) => (
          <div
            key={req.id}
            className="px-5 py-4 hover:bg-[var(--surface-soft)] transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={req.patientAvatar}
                className="w-10 h-10 rounded-xl object-cover"
                alt=""
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{req.patientName}</p>
                <p className="text-xs text-[var(--muted)]">
                  {req.reason.substring(0, 40)}...
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Prefers: {req.preferredDate}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                  Accept
                </button>
                <button className="px-3 py-1.5 border border-[var(--line)] text-xs rounded-lg hover:bg-[var(--surface-soft)]">
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentRequests;
