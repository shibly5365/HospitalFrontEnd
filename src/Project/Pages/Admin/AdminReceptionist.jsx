import { apiClient } from "../../../services/queryClient";
import React, { useEffect, useState, useMemo } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload,
} from "react-icons/fa";
import { Home, Users, UserCheck, Calendar, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Units/notification";

const AdminReceptionist = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceptionists = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/admin/getAll-Receptionist", {
          withCredentials: true,
        });

        if (res.data.success) {
          setReceptionists(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching receptionists:", error);
        notify.error("Failed to load receptionists");
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionists();
  }, []);

  const handleToggleStatus = async (user) => {
    try {
      let reason = "";

      // Ask reason only when blocking
      if (user.isActive) {
        reason = window.prompt("Why are you blocking this user?");

        if (!reason) {
          return notify.error("Blocking reason is required");
        }
      }

      const res = await apiClient.patch(
        `/admin/toggle/${user._id}`,
        { reason },
        { withCredentials: true },
      );

      if (res.data.success) {
        notify.success(res.data.message);

        setReceptionists((prev) =>
          prev.map((item) =>
            item._id === user._id
              ? {
                  ...item,

                  isActive: res.data.data.isActive,

                  accountStatus: res.data.data.accountStatus,

                  blockedReason: res.data.data.blockedReason,

                  blockedAt: res.data.data.blockedAt,
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);

      notify.error(error?.response?.data?.message || "Failed to update status");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this receptionist? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/admin/deleted-Receptionist/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        notify.success("Receptionist deleted successfully!");
        setReceptionists((prev) => prev.filter((r) => r._id !== id));
      } else {
        notify.error(res.data.message || "Failed to delete receptionist");
      }
    } catch (error) {
      notify.error("Something went wrong!");
    }
  };

  // Search and Filter Logic
  const filteredReceptionists = useMemo(() => {
    return receptionists
      .filter((r) => {
        const matchesSearch =
          r.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.employeeId?.includes(searchTerm);

        const matchesStatus =
          filterStatus === "all" ||
          (filterStatus === "active" && r.isActive !== false) ||
          (filterStatus === "inactive" && r.isActive === false);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let aValue = a[sortBy] || "";
        let bValue = b[sortBy] || "";

        if (sortBy === "patientsAdded" || sortBy === "appointmentsBooked") {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        } else if (sortBy === "age") {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        }

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [receptionists, searchTerm, filterStatus, sortBy, sortOrder]);

  const getStatusBadge = (receptionist) => {
    const isActive = receptionist.isActive !== false;
    return isActive
      ? "px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium"
      : "px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium";
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Receptionists
          </h1>
          <p className="text-slate-600 mt-2">
            Manage your reception staff and monitor their performance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/admin/creating-receptionist")}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium"
          >
            <FaPlus size={18} />
            Add Receptionist
          </button>
          <button className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <FaDownload size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Total Staff
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {receptionists.length}
              </p>
            </div>
            <Users className="w-12 h-12 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Patients Added
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {formatNumber(
                  receptionists.reduce(
                    (sum, r) => sum + (r.patientsAdded || 0),
                    0,
                  ),
                )}
              </p>
            </div>
            <UserCheck className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Appointments
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {formatNumber(
                  receptionists.reduce(
                    (sum, r) => sum + (r.appointmentsBooked || 0),
                    0,
                  ),
                )}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                Active Staff
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {receptionists.filter((r) => r.isActive !== false).length}
              </p>
            </div>
            <Phone className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[250px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-2xl bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Sort by:</span>
            {["name", "patientsAdded", "appointmentsBooked", "age"].map(
              (field) => (
                <button
                  key={field}
                  onClick={() => {
                    if (sortBy === field) {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy(field);
                      setSortOrder("asc");
                    }
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    sortBy === field
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {field === "name"
                    ? "Name"
                    : field.replace(/([A-Z])/g, " $1").trim()}
                  {sortBy === field && (
                    <FaSort
                      className={`ml-1 ${sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            <p className="mt-4 text-lg text-slate-600">
              Loading receptionists...
            </p>
          </div>
        ) : filteredReceptionists.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-32 px-4 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReceptionists.map((r, index) => (
                  <tr
                    key={r._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {r.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{r.age}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.gender === "Male"
                            ? "bg-blue-100 text-blue-800"
                            : r.gender === "Female"
                              ? "bg-pink-100 text-pink-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono bg-slate-50 px-3 py-1 rounded-full text-sm text-slate-700">
                      {r.employeeId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-slate-500 mr-2" />
                        <span className="text-slate-900 font-medium">
                          {r.contact}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 max-w-[200px] truncate">
                      {r.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-emerald-600 text-lg">
                        {formatNumber(r.patientsAdded)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-purple-600 text-lg">
                        {formatNumber(r.appointmentsBooked)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(r)}
                        className={`p-2 rounded-xl transition-all group-hover:scale-105 ${
                          r.isActive
                            ? "text-orange-600 hover:bg-orange-100"
                            : "text-emerald-600 hover:bg-emerald-100"
                        }`}
                        title={r.isActive ? "Deactivate" : "Activate"}
                      >
                        {r.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/receptionist/${r._id}`)
                          }
                          className="p-2 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl transition-all group-hover:scale-105"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          onClick={() => {
                            /* Edit modal */
                          }}
                          className="p-2 text-slate-700 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition-all group-hover:scale-105"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="p-2 text-slate-700 hover:bg-rose-100 hover:text-rose-700 rounded-xl transition-all group-hover:scale-105"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <Users className="w-20 h-20 text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Receptionists Found
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first receptionist."}
            </p>
            <button
              onClick={() => navigate("/admin/creating-receptionist")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg"
            >
              + Add First Receptionist
            </button>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="text-center text-sm text-slate-500 mt-6">
        Showing {filteredReceptionists.length} of {receptionists.length}{" "}
        receptionists
      </div>
    </div>
  );
};

export default AdminReceptionist;
