import React from "react";
import { Clock, ArrowRight, UserCheck, CalendarCheck, CreditCard, MessageCircle, FileText } from "lucide-react";

const RecentActivity = ({ dashboardData }) => {
  const recentActivities = dashboardData.recentActivity?.list || [];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case "registration":
        return `New patient registration`;
      case "appointment":
        return `Appointment scheduled`;
      case "payment":
        return `Payment processed`;
      case "message":
        return `Message sent to patient`;
      case "record":
        return `Medical record updated`;
      case "checkin":
        return `Patient check-in completed`;
      default:
        return `Activity completed`;
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      UserCheck,
      CalendarCheck,
      CreditCard,
      MessageCircle,
      FileText
    };
    return icons[iconName] || UserCheck;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          Recent Activity
          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg">
            {recentActivities.length}
          </span>
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = getIconComponent(activity.icon);
            return (
              <ActivityItem 
                key={activity._id} 
                activity={activity} 
                IconComponent={IconComponent}
                getActivityText={getActivityText}
                getTimeAgo={getTimeAgo}
              />
            );
          })}
        </div>
        
        <button className="w-full mt-4 p-3 text-center text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
          <ArrowRight className="w-4 h-4" />
          View All Activities
        </button>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity, getActivityText, getTimeAgo }) => (
  <div className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 hover:shadow-lg">
    <div className={`p-3 rounded-xl ${activity.bgColor} group-hover:scale-110 transition-transform duration-300`}>
      <getIconComponent className={`w-4 h-4 ${activity.color}`} />
    </div>
    
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 text-sm">
        {getActivityText(activity)}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        For {activity.patientName} • {getTimeAgo(activity.timestamp)}
      </p>
    </div>
    
    <div className={`w-2 h-2 rounded-full ${
      activity.status === 'completed' ? 'bg-emerald-500' :
      activity.status === 'scheduled' ? 'bg-blue-500' :
      activity.status === 'processed' ? 'bg-green-500' :
      'bg-purple-500'
    }`}></div>
  </div>
);

export default RecentActivity;