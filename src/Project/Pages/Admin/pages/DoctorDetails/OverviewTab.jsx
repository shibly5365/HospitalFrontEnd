import React from "react";
import {
  User,
  Stethoscope,
  Clock,
  Award,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OverviewTab = ({ doctor, attendance }) => {
  const weeklyPatientData = [
    { day: "Mon", patients: 24 },
    { day: "Tue", patients: 28 },
    { day: "Wed", patients: 32 },
    { day: "Thu", patients: 26 },
    { day: "Fri", patients: 30 },
    { day: "Sat", patients: 18 },
    { day: "Sun", patients: 12 },
  ];

  const attendanceData = attendance.slice(-10).map((record) => ({
    date: new Date(record.date).getDate(),
    status: record.status === "Present" ? 1 : 0,
  }));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Basic Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Doctor Name</span>
              <span className="font-medium">{doctor.basicInfo.name || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Doctor ID</span>
              <span className="font-medium">
                {doctor.basicInfo.doctorId || doctor.basicInfo._id || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Department</span>
              <span className="font-medium">
                {doctor.basicInfo.department || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{doctor.basicInfo.email || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{doctor.basicInfo.phone || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Address</span>
              <span className="font-medium text-right">
                {doctor.basicInfo.address || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium">{doctor.basicInfo.gender || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Date of Birth</span>
              <span className="font-medium">
                {doctor.basicInfo.dob
                  ? new Date(doctor.basicInfo.dob).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Joining Date</span>
              <span className="font-medium">
                {doctor.basicInfo.joiningDate
                  ? new Date(doctor.basicInfo.joiningDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
            Professional Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Qualification</span>
              <span className="font-medium">{doctor.professionalInfo.qualification || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Specialization</span>
              <span className="font-medium">
                {doctor.professionalInfo.specialization || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Experience</span>
              <span className="font-medium">
                {doctor.professionalInfo.experience || 0} years
              </span>
            </div>
            <div className="py-2 border-b">
              <span className="text-gray-500 block mb-2">Certifications</span>
              <div className="space-y-1">
                {doctor.certifications && doctor.certifications.length > 0 ? (
                  doctor.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <Award className="w-4 h-4 text-green-600 mr-2" />
                      <span>{cert}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No certifications listed
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Consultation Type</span>
              <span className="font-medium">
                {doctor.professionalInfo.consultationType || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Salary</span>
              <span className="font-medium text-green-600">
                ${doctor.professionalInfo.salary?.toLocaleString() || 0}/year
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Availability
          </h3>
          <div className="space-y-3">
            <div className="py-2 border-b">
              <span className="text-gray-500 block mb-2">Working Days</span>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <span
                      key={day}
                      className={`px-2 py-1 text-xs rounded ${
                        doctor.workingDays?.some((d) => d.startsWith(day))
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Shift Timings</span>
              <span className="font-medium">
                {doctor.availability.shiftTimings
                  ? `${doctor.availability.shiftTimings} `
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Current Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  doctor.availability.status == "available"
                    ? "bg-green-100 text-green-800"
                    : doctor.availability.status === "Busy"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doctor.availability.statuss || "Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Patient Activity (Weekly)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyPatientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance Trend (Last 10 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(value) => (value === 1 ? "Present" : "Absent")}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="status"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default OverviewTab;