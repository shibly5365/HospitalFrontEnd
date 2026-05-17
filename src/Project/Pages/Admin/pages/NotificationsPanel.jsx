import React, { useState } from 'react';
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Trash2,
  X,
} from 'lucide-react';

const NotificationsPanel = ({ notifications = [], onNotificationRead = () => {} }) => {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [displayNotifications, setDisplayNotifications] = useState(
    notifications.length > 0
      ? notifications
      : mockNotifications
  );

  const filteredNotifications = unreadOnly
    ? displayNotifications.filter((n) => !n.read)
    : displayNotifications;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'leave':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'conflict':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'staff':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'leave':
        return 'bg-orange-50 border-orange-200';
      case 'conflict':
        return 'bg-red-50 border-red-200';
      case 'staff':
        return 'bg-blue-50 border-blue-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleDismiss = (id) => {
    setDisplayNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setDisplayNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    onNotificationRead(id);
  };

  const unreadCount = displayNotifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </h3>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="rounded"
          />
          Unread only
        </label>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{unreadOnly ? 'No unread notifications' : 'All caught up!'}</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 transition-colors ${
                notification.read ? 'bg-gray-50 border-gray-300' : `${getNotificationColor(notification.type)} border-l-4`
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="mt-1 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex gap-2 ml-7">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-xs px-2 py-1 rounded bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors font-medium"
                  >
                    Mark as read
                  </button>
                )}
                {notification.action && (
                  <button className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors font-medium">
                    {notification.action}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {displayNotifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full text-xs text-teal-600 hover:text-teal-700 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'leave',
    title: 'New Leave Request',
    message: 'Dr. John Smith requested leave for May 10-15',
    time: '5 minutes ago',
    read: false,
    action: 'Review',
  },
  {
    id: 2,
    type: 'conflict',
    title: 'Schedule Conflict Detected',
    message: 'Dr. Sarah Johnson has overlapping shifts on May 8th',
    time: '12 minutes ago',
    read: false,
    action: 'Resolve',
  },
  {
    id: 3,
    type: 'staff',
    title: 'Staff Absence Alert',
    message: 'Nurse Rachel marked as offline - morning shift affected',
    time: '1 hour ago',
    read: false,
    action: 'Reassign',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Emergency Staff Needed',
    message: 'Cardiology department needs emergency coverage',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'leave',
    title: 'Leave Request Approved',
    message: 'Dr. Mike Brown\'s leave for May 20-22 has been approved',
    time: '3 hours ago',
    read: true,
  },
];

export default NotificationsPanel;
