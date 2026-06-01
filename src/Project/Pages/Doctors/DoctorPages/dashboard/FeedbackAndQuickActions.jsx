import React from "react";
import { Star, Sparkles, UserPlus, Video, Pill, FileText } from "lucide-react";

const FeedbackAndQuickActions = () => {
  const feedbacks = [
    {
      id: 1,
      patient: "Rahul Sharma",
      rating: 5,
      comment: "Excellent doctor! Very thorough and caring.",
      date: "2 days ago",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    },
    {
      id: 2,
      patient: "Sneha Verma",
      rating: 4,
      comment: "Good experience, wait time was a bit long.",
      date: "5 days ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
    },
    {
      id: 3,
      patient: "Vikram Singh",
      rating: 5,
      comment: "Really helped with my condition. Highly recommended!",
      date: "1 week ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Feedback */}
      <div className="bg-[var(--surface)] rounded-3xl shadow-sm border border-[var(--line)] p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Patient Feedback</h2>
          <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full">
            <Star size={14} className="text-emerald-600 fill-emerald-600" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="flex gap-3 pb-3 border-b border-[var(--line)] last:border-0"
            >
              <img
                src={fb.avatar}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{fb.patient}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < fb.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] mt-1">{fb.comment}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{fb.date}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2.5 text-center text-blue-600 text-sm font-medium border border-[var(--line)] rounded-xl hover:bg-[var(--surface-soft)] transition-all">
          View All Feedback
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles size={20} />
          <h3 className="font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm flex items-center justify-center gap-1 hover:bg-white/30">
            <UserPlus size={14} /> New Patient
          </button>
          <button className="bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm flex items-center justify-center gap-1 hover:bg-white/30">
            <Video size={14} /> Start Call
          </button>
          <button className="bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm flex items-center justify-center gap-1 hover:bg-white/30">
            <Pill size={14} /> Prescribe
          </button>
          <button className="bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm flex items-center justify-center gap-1 hover:bg-white/30">
            <FileText size={14} /> Write Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndQuickActions;
