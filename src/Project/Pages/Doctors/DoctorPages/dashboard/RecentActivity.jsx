import React from "react";
import { Activity, ClipboardList, Pill, ArrowRight } from "lucide-react";

const RecentActivity = () => {
  const recentActivity = [
    {
      id: 1,
      action: "Completed consultation",
      patient: "Amit Patel",
      time: "2 hours ago",
      type: "consultation",
    },
    {
      id: 2,
      action: "Reviewed lab reports",
      patient: "Neha Gupta",
      time: "3 hours ago",
      type: "review",
    },
    {
      id: 3,
      action: "Updated prescription",
      patient: "Sanjay Kumar",
      time: "5 hours ago",
      type: "prescription",
    },
    {
      id: 4,
      action: "Added new notes",
      patient: "Priya Menon",
      time: "Yesterday",
      type: "notes",
    },
  ];

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border border-[var(--line)] overflow-hidden">
      <div className="px-7 py-5 border-b border-[var(--line)] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            Your latest patient interactions
          </p>
        </div>
        <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
          View history <ArrowRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="px-7 py-4 flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${activity.type === "consultation" ? "bg-blue-100 text-blue-600" : activity.type === "review" ? "bg-purple-100 text-purple-600" : "bg-emerald-100 text-emerald-600"}`}
            >
              {activity.type === "consultation" ? (
                <Activity size={16} />
              ) : activity.type === "review" ? (
                <ClipboardList size={16} />
              ) : (
                <Pill size={16} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text)]">
                {activity.action}
              </p>
              <p className="text-xs text-[var(--muted)]">
                Patient: {activity.patient}
              </p>
            </div>
            <p className="text-xs text-[var(--muted)]">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
