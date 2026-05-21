// components/admin/AdminPatients.jsx
import React, { useEffect, useState } from "react";
import { Search, UserPlus, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Units/notification";
import toast from "react-hot-toast";
import { apiClient } from "../../../services/queryClient";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await apiClient.get("/admin/getAll-patients", {
          withCredentials: true,
        });
        setPatients(res.data.patients || res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        notify.error("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      patient.email?.toLowerCase().includes(search.toLowerCase()),
  );
  console.log(filteredPatients);

  const handleDeletePatient = async (id, name) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>
            Are you sure you want to delete <strong>{name}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              onClick={() => toast.dismiss(t._id)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              onClick={async () => {
                try {
                  await apiClient.delete(`/admin/delete-patients/${id}`, {
                    withCredentials: true,
                  });
                  setPatients((prev) => prev.filter((p) => p._id !== id));
                  notify.success("Patient deleted successfully");
                } catch (err) {
                  notify.error("Failed to delete patient");
                } finally {
                  toast.dismiss(t._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  // Fallback to initials if no image
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor all registered patients
            </p>
          </div>

          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-medium transition shadow-sm">
            <UserPlus size={20} />
            Add New Patient
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-white border border-gray-300 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-teal-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition text-sm font-medium">
              All Patients
            </button>
            <button className="px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition text-sm font-medium">
              Recent
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-3xl shadow border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500 text-lg">
              Loading patients...
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No patients found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Patient
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Age
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Gender
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Contact
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Total Visits
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient._id}
                      className="hover:bg-teal-50/60 transition group"
                    >
                      {/* Profile Image Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl overflow-hidden border border-gray-200 flex-shrink-0">
                            {patient.profileImage ||
                            patient.avatar ||
                            patient.image ? (
                              <img
                                src={
                                  patient.profileImage ||
                                  patient.avatar ||
                                  patient.image
                                }
                                alt={patient.fullName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-full h-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-lg">
                                      ${getInitials(patient.fullName)}
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-lg border border-teal-200">
                                {getInitials(patient.fullName)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {patient.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {patient._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {patient.age || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {patient.gender || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {patient.contact || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {patient.email}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full">
                          {patient.patientType || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-700">
                        {patient.summary?.totalVisits || 0}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/patients/${patient._id || patient.id}`,
                              )
                            }
                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                            title="View Details"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeletePatient(
                                patient._id || patient.id,
                                patient.fullName,
                              )
                            }
                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition"
                            title="Delete Patient"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
