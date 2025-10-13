import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaUser,
  FaUserMd,
  FaUsers,
  FaFileMedical,
  FaUserFriends,
  FaMicroscope,
  FaCalendarAlt,
  FaDollarSign,
  FaDownload,
} from "react-icons/fa";

// Colors for PieChart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#FF6F91",
];

const AdminDashboard = () => {
  // Dummy Data
  const patientStats = [
    { name: "25 May", new: 20, old: 30 },
    { name: "26 May", new: 25, old: 40 },
    { name: "27 May", new: 30, old: 50 },
    { name: "28 May", new: 35, old: 70 },
    { name: "29 May", new: 28, old: 40 },
    { name: "30 May", new: 20, old: 50 },
    { name: "31 May", new: 18, old: 30 },
  ];

  const deptData = [
    { name: "Cardiology", value: 400 },
    { name: "Neurology", value: 300 },
    { name: "Dermatology", value: 300 },
    { name: "Orthopedics", value: 200 },
    { name: "Urology", value: 278 },
    { name: "Radiology", value: 189 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Stats */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Side - Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Welcome Admin</h1>

        {/* Right Side - Date */}
        <p className="text-gray-600 font-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Patients</p>
            <h2 className="text-2xl font-bold">108</h2>
          </div>
          <FaUser className="text-blue-500 text-3xl" />
        </div>
        <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Appointments</p>
            <h2 className="text-2xl font-bold">658</h2>
          </div>
          <FaCalendarAlt className="text-orange-500 text-3xl" />
        </div>
        <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Doctors</p>
            <h2 className="text-2xl font-bold">565</h2>
          </div>
          <FaUserMd className="text-purple-500 text-3xl" />
        </div>
        <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Transactions</p>
            <h2 className="text-2xl font-bold">$5,523.56</h2>
          </div>
          <FaDollarSign className="text-pink-500 text-3xl" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Appointment Request */}
          <div className="bg-white shadow rounded-2xl p-6">
            {/* Heading + Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Appointment Request</h3>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow">
                View All Appointments
              </button>
            </div>

            {/* Appointment List */}
            <div className="space-y-4">
              {[
                {
                  name: "Dominic Foster",
                  dept: "Urology",
                  date: "12 Aug 2025",
                  time: "11:35 PM",
                },
                {
                  name: "Charlotte Bennett",
                  dept: "Cardiology",
                  date: "06 Aug 2025",
                  time: "09:58 AM",
                },
                {
                  name: "Ethan Sullivan",
                  dept: "Dermatology",
                  date: "01 Aug 2025",
                  time: "12:10 PM",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.date} - {item.time}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {item.dept}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
                      ✔
                    </button>
                    <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Small Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaUser className="text-blue-500 text-2xl mb-2" />
              <p className="font-semibold">Patients</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaUserMd className="text-purple-500 text-2xl mb-2" />
              <p className="font-semibold">Doctors</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaUsers className="text-green-500 text-2xl mb-2" />
              <p className="font-semibold">Receptionists</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Patients Statistics */}
          <div className="bg-white shadow rounded-2xl p-6">
            {/* Heading + Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Patients Statistics</h3>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow">
                View All Patients
              </button>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patientStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" stackId="a" fill="#0088FE" />
                <Bar dataKey="old" stackId="a" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 3 Small Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaFileMedical className="text-red-500 text-2xl mb-2" />
              <p className="font-semibold">Prescriptions</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaUserFriends className="text-yellow-500 text-2xl mb-2" />
              <p className="font-semibold">Visitors</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <FaMicroscope className="text-indigo-500 text-2xl mb-2" />
              <p className="font-semibold">Medical Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* === NEW SECTION LIKE IMAGE === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Reports */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex justify-between">
            Patient Reports{" "}
            <button className="text-sm text-blue-500">View All</button>
          </h3>
          <div className="space-y-3">
            {[
              { name: "David Marshall", test: "Hemoglobin" },
              { name: "Thomas McLean", test: "X Ray" },
              { name: "Greta Kinney", test: "MRI Scan" },
              { name: "Larry Wilburn", test: "Blood Test" },
              { name: "Reyan Verol", test: "CT Scan" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.test}</p>
                </div>
                <FaDownload className="text-gray-500 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* Patient Visits */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex justify-between">
            Patient Visits{" "}
            <button className="text-sm text-blue-500">View All</button>
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-8 border-dashed border-blue-400 flex items-center justify-center">
              <span className="text-xl font-bold">90%</span>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-blue-600">Male - 69%</p>
              <p className="text-sm text-purple-600">Female - 56%</p>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex justify-between">
            Doctors <button className="text-sm text-blue-500">View All</button>
          </h3>
          <div className="space-y-3">
            {[
              {
                name: "Dr. William Harrison",
                dept: "Cardiology",
                status: "Available",
              },
              {
                name: "Dr. Victoria Adams",
                dept: "Urology",
                status: "Unavailable",
              },
              {
                name: "Dr. Jonathan Bennett",
                dept: "Radiology",
                status: "Available",
              },
              {
                name: "Dr. Natalie Brooks",
                dept: "ENT Surgery",
                status: "Available",
              },
              {
                name: "Dr. Samuel Reed",
                dept: "Dermatology",
                status: "Available",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.dept}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    doc.status === "Available"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Departments */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex justify-between">
            Top Departments{" "}
            <button className="text-sm text-blue-500">View All</button>
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deptData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {deptData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-4">
            <p>$2512.32 Revenue Generated</p>
            <p>3125+ Appointments last month</p>
          </div>
        </div>

        {/* Patient Record */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex justify-between">
            Patient Record{" "}
            <button className="text-sm text-blue-500">View All</button>
          </h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="pb-2">Patient Name</th>
                <th className="pb-2">Diagnosis</th>
                <th className="pb-2">Department</th>
                <th className="pb-2">Last Visit</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                {
                  name: "James Carter",
                  diag: "Male",
                  dept: "Cardiology",
                  date: "17 Jun 2025",
                },
                {
                  name: "Emily Davis",
                  diag: "Female",
                  dept: "Urology",
                  date: "10 Jun 2025",
                },
                {
                  name: "Michael John",
                  diag: "Male",
                  dept: "Radiology",
                  date: "22 May 2025",
                },
                {
                  name: "Olivia Miller",
                  diag: "Female",
                  dept: "ENT Surgery",
                  date: "15 May 2025",
                },
                {
                  name: "David Smith",
                  diag: "Male",
                  dept: "Dermatology",
                  date: "30 Apr 2025",
                },
              ].map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.diag}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                      {item.dept}
                    </span>
                  </td>
                  <td className="py-2">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Latest Appointments */}
      <div className="bg-white shadow rounded-2xl p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 flex justify-between">
          Latest Appointments{" "}
          <button className="text-sm text-blue-500">View All</button>
        </h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="pb-2">Patient ID</th>
              <th className="pb-2">Patient Name</th>
              <th className="pb-2">Session Type</th>
              <th className="pb-2">Doctor Name</th>
              <th className="pb-2">Date & Time</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              {
                id: "#PT0025",
                patient: "James Carter",
                session: "Visit",
                doctor: "Dr. Andrew Clark",
                date: "17 Jun 2025, 09:00 AM to 10:00 AM",
                status: "Inprogress",
              },
              {
                id: "#PT0024",
                patient: "Emily Davis",
                session: "Consultation",
                doctor: "Dr. Katherine Brooks",
                date: "10 Jun 2025, 10:30 AM to 11:30 AM",
                status: "Inprogress",
              },
              {
                id: "#PT0023",
                patient: "Michael Johnson",
                session: "Visit",
                doctor: "Dr. Benjamin Harris",
                date: "22 May 2025, 01:15 PM to 02:15 PM",
                status: "Completed",
              },
              {
                id: "#PT0022",
                patient: "Olivia Miller",
                session: "Consultation",
                doctor: "Dr. Laura Mitchell",
                date: "15 May 2025, 11:30 AM to 12:30 PM",
                status: "Completed",
              },
              {
                id: "#PT0021",
                patient: "David Smith",
                session: "Consultation",
                doctor: "Dr. Christopher Lewis",
                date: "30 Apr 2025, 12:20 PM to 01:20 PM",
                status: "Completed",
              },
            ].map((appt, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{appt.id}</td>
                <td className="py-2 flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 1}`} // dummy avatar
                    alt={appt.patient}
                    className="w-8 h-8 rounded-full"
                  />
                  {appt.patient}
                </td>
                <td className="py-2">{appt.session}</td>
                <td className="py-2 flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 20}`} // dummy doctor avatar
                    alt={appt.doctor}
                    className="w-8 h-8 rounded-full"
                  />
                  {appt.doctor}
                </td>
                <td className="py-2">{appt.date}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      appt.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
