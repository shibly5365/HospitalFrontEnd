import { apiClient } from "../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Ban,
  Unlock,
  Eye,
  Plus,
  Search,
  X,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Activity,
} from "lucide-react";
import { notify } from "../../../units/notification";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await apiClient.get(
        "/superadmin/getall-admin",
        { withCredentials: true }
      );
      setAdmins(res.data || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
      notify.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files?.length > 0) {
      setProfileFile(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setNewAdmin((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newAdmin).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (profileFile) formData.append("profileImage", profileFile);

      if (editingAdmin) {
        // Update admin
        const res = await apiClient.put(
          `/superadmin/updated-admin/${editingAdmin._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setAdmins((prev) =>
          prev.map((admin) =>
            admin._id === editingAdmin._id ? res.data : admin
          )
        );
        notify.success("Admin updated successfully");
      } else {
        // Create admin
        const res = await apiClient.post(
          "/superadmin/create-admin",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setAdmins((prev) => [...prev, res.data.data]);
        notify.success("Admin created successfully");
      }

      resetForm();
    } catch (err) {
      console.error("Error saving admin:", err);
      notify.error(err.response?.data?.message || "Failed to save admin");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await apiClient.delete(
        `/superadmin/delete-admin/${id}`,
        { withCredentials: true }
      );
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      notify.success("Admin deleted successfully");
    } catch (err) {
      console.error("Error deleting admin:", err);
      notify.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleToggleBlock = async (id, currentStatus) => {
    try {
      const res = await apiClient.put(
        `/superadmin/toggle-block-admin/${id}`,
        {},
        { withCredentials: true }
      );
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === id ? { ...admin, isBlocked: !admin.isBlocked } : admin
        )
      );
      notify.success(
        currentStatus ? "Admin unblocked successfully" : "Admin blocked successfully"
      );
    } catch (err) {
      console.error("Error toggling block:", err);
      notify.error("Failed to update admin status");
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setNewAdmin({
      fullName: admin.fullName || "",
      email: admin.email || "",
      password: "",
      contact: admin.contact || "",
    });
    setPreviewImage(admin.profileImage || "");
    setShowModal(true);
  };

  const resetForm = () => {
    setNewAdmin({ fullName: "", email: "", password: "", contact: "" });
    setProfileFile(null);
    setPreviewImage("");
    setEditingAdmin(null);
    setShowModal(false);
  };

  const handleViewDetails = (adminId) => {
    navigate(`/super-admin/admin-details/${adminId}`);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.contact?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Management</h1>
            <p className="text-gray-600">Manage and monitor all admin accounts</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="mt-4 md:mt-0 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Admin
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />
        </div>
      </div>

      {/* Admins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdmins.length > 0 ? (
          filteredAdmins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {admin.profileImage ? (
                        <img
                          src={admin.profileImage}
                          alt={admin.fullName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      {admin.isBlocked && (
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-red-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {admin.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{admin.email}</span>
                  </div>
                  {admin.contact && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{admin.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined: {new Date(admin.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {admin.isBlocked && (
                  <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Blocked</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewDetails(admin._id)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(admin)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleBlock(admin._id, admin.isBlocked)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      admin.isBlocked
                        ? "bg-green-100 hover:bg-green-200 text-green-700"
                        : "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {admin.isBlocked ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Ban className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No admins found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingAdmin ? "Edit Admin" : "Create Admin"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleChange}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={newAdmin.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  required
                />
              </div>
              {!editingAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    required={!editingAdmin}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={newAdmin.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  {editingAdmin ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAdmin;
