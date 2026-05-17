import React from "react";
import { Users, Calendar as CalendarIcon, User, DollarSign } from "lucide-react";

const ActivityTab = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Activity Timeline
      </h3>
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-4 border-b last:border-0"
            >
              <div className="flex-shrink-0">
                {activity.type === "patient" && (
                  <Users className="w-5 h-5 text-blue-500" />
                )}
                {activity.type === "leave" && (
                  <CalendarIcon className="w-5 h-5 text-orange-500" />
                )}
                {activity.type === "profile" && (
                  <User className="w-5 h-5 text-green-500" />
                )}
                {activity.type === "payment" && (
                  <DollarSign className="w-5 h-5 text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No activity records found
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityTab;