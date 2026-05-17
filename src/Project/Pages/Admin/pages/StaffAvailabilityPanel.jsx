import { apiClient } from "../../../../services/queryClient";
import React, { useState, useEffect } from 'react';
import {
  Filter,
  RefreshCw,
  Circle,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

const StaffAvailabilityPanel = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');
  const [departments, setDepartments] = useState([]);

  const shifts = ['Morning', 'Evening', 'Night'];

  // Fetch staff availability
  useEffect(() => {
    const fetchStaffAvailability = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          '/admin/overView',
          { withCredentials: true }
        );
        console.log("faaaaaa",response.data);
        
        
        const staffData = response.data.staff || mockStaffData;
        setStaff(staffData);
        
        const depts = [...new Set(staffData.map((s) => s.department))];
        setDepartments(depts);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setStaff(mockStaffData);
        setDepartments(['Cardiology', 'Neurology', 'Surgery']);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffAvailability();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = staff;

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter((s) => s.department === selectedDepartment);
    }

    if (selectedShift !== 'all') {
      filtered = filtered.filter((s) => s.shift === selectedShift);
    }

    setFilteredStaff(filtered);
  }, [staff, selectedDepartment, selectedShift]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm font-medium">Available</span>
          </div>
        );
      case 'busy':
        return (
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-600 text-sm font-medium">Busy</span>
          </div>
        );
      case 'offline':
        return (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-medium">Offline</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Staff Availability</h2>
          <button
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Shifts</option>
            {shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff List */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading staff...</div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No staff found</div>
        ) : (
          filteredStaff.map((member) => (
            <div
              key={member.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  {member.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.role} • {member.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">{member.shift}</span>
                </div>
                {getStatusBadge(member.status)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Summary */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredStaff.filter((s) => s.status === 'available').length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Busy</p>
          <p className="text-2xl font-bold text-yellow-600">
            {filteredStaff.filter((s) => s.status === 'busy').length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Offline</p>
          <p className="text-2xl font-bold text-red-600">
            {filteredStaff.filter((s) => s.status === 'offline').length}
          </p>
        </div>
      </div>
    </div>
  );
};

// Mock data for development
const mockStaffData = [
  {
    id: 1,
    name: 'Dr. John Smith',
    role: 'Doctor',
    department: 'Cardiology',
    shift: 'Morning',
    status: 'available',
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    role: 'Doctor',
    department: 'Neurology',
    shift: 'Morning',
    status: 'busy',
  },
  {
    id: 3,
    name: 'Nurse Rachel',
    role: 'Nurse',
    department: 'Cardiology',
    shift: 'Evening',
    status: 'available',
  },
  {
    id: 4,
    name: 'Dr. Mike Brown',
    role: 'Doctor',
    department: 'Surgery',
    shift: 'Night',
    status: 'offline',
  },
  {
    id: 5,
    name: 'Receptionist Lisa',
    role: 'Receptionist',
    department: 'General',
    shift: 'Morning',
    status: 'available',
  },
  {
    id: 6,
    name: 'Dr. Emma Davis',
    role: 'Doctor',
    department: 'Surgery',
    shift: 'Morning',
    status: 'available',
  },
];

export default StaffAvailabilityPanel;
