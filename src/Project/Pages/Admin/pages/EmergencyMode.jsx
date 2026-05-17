import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmergencyMode = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('cardiology');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [reassignmentHistory, setReassignmentHistory] = useState([]);

  const departments = {
    cardiology: {
      name: 'Cardiology',
      priority: 'Critical',
      alert: 'Immediate coverage needed',
      availableStaff: [
        {
          id: 1,
          name: 'Dr. John Smith',
          status: 'available',
          responseTime: '5 min',
          distance: '2 floors',
        },
        {
          id: 2,
          name: 'Dr. Emma Davis',
          status: 'on-break',
          responseTime: '10 min',
          distance: '4 floors',
        },
      ],
    },
    neurology: {
      name: 'Neurology',
      priority: 'High',
      alert: 'Coverage requested',
      availableStaff: [
        {
          id: 3,
          name: 'Dr. Sarah Johnson',
          status: 'available',
          responseTime: '3 min',
          distance: 'Same floor',
        },
      ],
    },
    surgery: {
      name: 'Surgery',
      priority: 'Critical',
      alert: 'Emergency surgery prep',
      availableStaff: [
        {
          id: 4,
          name: 'Dr. Mike Brown',
          status: 'available',
          responseTime: '2 min',
          distance: 'Operating room nearby',
        },
        {
          id: 5,
          name: 'Nurse Rachel',
          status: 'available',
          responseTime: '1 min',
          distance: 'Same room',
        },
      ],
    },
  };

  const currentDept = departments[selectedDepartment];

  const handleQuickReassign = (staff) => {
    setSelectedStaff(staff);
    toast.success(`✅ Emergency reassignment initiated for ${staff.name}`);

    // Add to history
    setReassignmentHistory([
      {
        id: Date.now(),
        staff: staff.name,
        department: currentDept.name,
        time: new Date().toLocaleTimeString(),
        status: 'assigned',
      },
      ...reassignmentHistory,
    ]);

    // Reset after animation
    setTimeout(() => {
      setSelectedStaff(null);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'on-break':
        return 'bg-yellow-100 text-yellow-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">🚨 EMERGENCY MODE ACTIVATED</h2>
            <p className="text-red-100 mb-4">
              Quick staff reassignment priority system. Prioritized responses for critical coverage needs.
            </p>
            <div className="flex gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Auto-notify staff • Priority routing active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Department</h3>
          <div className="space-y-2">
            {Object.entries(departments).map(([key, dept]) => (
              <button
                key={key}
                onClick={() => setSelectedDepartment(key)}
                className={`w-full p-4 rounded-lg text-left transition-colors border-2 ${
                  selectedDepartment === key
                    ? 'bg-red-50 border-red-500'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{dept.name}</p>
                <p className={`text-xs mt-1 ${key === selectedDepartment ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                  {dept.alert}
                </p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded font-bold ${
                    dept.priority === 'Critical'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-orange-200 text-orange-800'
                  }`}
                >
                  {dept.priority} Priority
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Staff */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            🔴 AVAILABLE STAFF - {currentDept.name.toUpperCase()}
          </h3>

          <div className="space-y-3">
            {currentDept.availableStaff.map((staff) => (
              <div
                key={staff.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStaff?.id === staff.id
                    ? 'bg-green-100 border-green-500 ring-2 ring-green-300'
                    : 'bg-gray-50 border-gray-200 hover:border-red-400'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.distance}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(staff.status)}`}>
                    {staff.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Response: {staff.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{staff.distance}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickReassign(staff)}
                  className={`w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                    selectedStaff?.id === staff.id
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {selectedStaff?.id === staff.id ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      ASSIGNED ✓
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      QUICK ASSIGN
                    </>
                  )}
                </button>
              </div>
            ))}

            {currentDept.availableStaff.length === 0 && (
              <div className="p-6 text-center bg-red-50 border-2 border-red-300 rounded-lg">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <p className="text-red-800 font-semibold">No available staff</p>
                <p className="text-red-600 text-sm mt-1">
                  All staff in this department are busy. Consider expanding search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reassignment History */}
      {reassignmentHistory.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Reassignments</h3>
          <div className="space-y-2">
            {reassignmentHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{entry.staff}</p>
                    <p className="text-xs text-gray-600">
                      Assigned to {entry.department} at {entry.time}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold">
                  {entry.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-700 font-bold transition-colors flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call All Available
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-orange-700 font-bold transition-colors flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Broadcast Alert
          </button>
          <button className="p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 font-bold transition-colors flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            Extend Shifts
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 font-bold transition-colors flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Escalate Issue
          </button>
        </div>
      </div>

      {/* Emergency Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-bold">💡 Tip:</span> In emergency mode, staff reassignments are prioritized based on
          proximity and availability. All assigned staff will receive instant notifications.
        </p>
      </div>
    </div>
  );
};

export default EmergencyMode;
