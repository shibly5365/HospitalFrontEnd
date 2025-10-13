import React, { useEffect, useState } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Bell,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [statuses] = useState(["available", "unavailable"]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 13;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getAll-Doctor",
          { withCredentials: true }
        );

        const doctorsData =
          res.data.Doctors || res.data.doctors || res.data || [];

        setDoctors(doctorsData);

        const deptList = [
          ...new Set(doctorsData.map((doc) => doc.department).filter(Boolean)),
        ];
        const specList = [
          ...new Set(
            doctorsData.map((doc) => doc.specialization).filter(Boolean)
          ),
        ];

        setDepartments(deptList);
        setSpecialists(specList);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (id) => {
    alert(`Edit doctor ${id}`);
  };

  console.log(doctors);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(
          `http://localhost:4002/api/admin/delete-Doctor/${id}`,
          { withCredentials: true }
        );
        setDoctors(doctors.filter((doc) => doc._id !== id));
      } catch (err) {
        console.error("Error deleting doctor:", err);
      }
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = (doc.userId?.fullName || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDept = selectedDept ? doc.department === selectedDept : true;
    const matchesSpec = selectedSpec
      ? doc.specialization === selectedSpec
      : true;
    const matchesStatus = selectedStatus ? doc.status === selectedStatus : true;

    return matchesSearch && matchesDept && matchesSpec && matchesStatus;
  });

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* 🔹 Top Bar with Heading + Profile */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>

        <div className="flex items-center space-x-4">
          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={22} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={22} className="text-gray-600" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>

      {/* 🔹 Main Box */}
      <div className="bg-gray-200 shadow-lg rounded-xl p-6 gap-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side: Search + Filters */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="flex items-center border rounded-xl bg-gray-50 px-3 py-2">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="outline-none text-sm bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 bg-gray-50 border rounded-xl text-sm"
            >
              <option value="">All Departments</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Specialist Filter */}
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="px-4 py-2 bg-gray-50 border rounded-xl text-sm"
            >
              <option value="">All Specialists</option>
              {specialists.map((spec, i) => (
                <option key={i} value={spec}>
                  {spec}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border rounded-xl text-sm"
            >
              <option value="">All Status</option>
              {statuses.map((stat, i) => (
                <option key={i} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>

          {/* Right Side: Add Doctor */}
          <button
            className="flex items-center px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            onClick={() => navigate("/admin/doctorForm")}
          >
            <UserPlus size={18} className="mr-2" /> Add Doctor
          </button>
        </div>

        {/* Doctors Table */}
        <div className=" p-4 rounded-lg">
          <div className="overflow-x-auto bg-white rounded shadow">
            {loading ? (
              <p className="p-4 text-gray-500">Loading doctors...</p>
            ) : currentDoctors.length === 0 ? (
              <p className="p-4 text-gray-500">No doctors found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span>Name</span>
                        <div className="flex flex-col gap-0">
                          <ChevronUp size={8} />
                          <ChevronDown size={8} />
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Doctor ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Specialist
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Total Patients
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Today's Appointments
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentDoctors.map((doc, i) => (
                    <tr key={doc._id || i}>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={
                            doc.profileImage || "https://via.placeholder.com/40"
                          }
                          alt={doc.name || "Doctor"}
                          className="w-10 h-10 rounded-full border object-cover"
                        />
                        <span>{doc.name || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4">{doc.doctorId}</td>
                      <td className="px-6 py-4">{doc.department || "N/A"}</td>
                      <td className="px-6 py-4">
                        {doc.specialization || "N/A"}
                      </td>
                      <td className="px-6 py-4">{doc.totalPatients || 0}</td>
                      <td className="px-6 py-4">
                        {doc.todaysAppointments || 0}
                      </td>
                      <td className="px-6 py-4">
                        {doc.status === "available" ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-xl text-sm">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-xl text-sm">
                            Unavailable
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <button
                          onClick={() => handleEdit(doc._id)}
                          className="text-black hover:text-blue-800"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="text-bl hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
