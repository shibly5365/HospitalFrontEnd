// src/components/support/ActivityFeed.jsx
import React from 'react';
import { Zap } from 'lucide-react';

const activities = [
  { time: "2m ago", text: "New complaint received from Cardiology department", type: "new" },
  { time: "17m ago", text: "Ticket MC-39281 assigned to Dr. Ananya Sharma", type: "assign" },
  { time: "41m ago", text: "Billing issue #MC-39280 marked as Resolved", type: "resolved" },
  { time: "2h ago", text: "High priority ticket escalated", type: "escalated" },
];

const ActivityFeed = () => {
  return (
    <div className="w-80 border-l border-zinc-800 bg-zinc-900 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Zap className="text-emerald-400" />
          Live Activity
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-auto">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4">
            <div className="text-xs text-zinc-500 w-14 flex-shrink-0 pt-1">{activity.time}</div>
            <div className="text-sm text-zinc-300 leading-snug">
              {activity.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Department Stats */}
      <div className="p-6 border-t border-zinc-800">
        <div className="bg-zinc-800/50 rounded-3xl p-5">
          <p className="uppercase text-xs tracking-widest text-zinc-400 mb-4">Top Departments</p>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span>Cardiology</span>
                <span className="font-medium">14</span>
              </div>
              <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-emerald-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span>General Medicine</span>
                <span className="font-medium">9</span>
              </div>
              <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-sky-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;