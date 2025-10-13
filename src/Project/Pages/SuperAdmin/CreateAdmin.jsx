import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Ban } from "lucide-react";
import axios from "axios";
import { notify } from "../../../Units/notification";

const CreateAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch admins on mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/superadmin/getall-admin",
          { withCredentials: true }
        );
        setAdmins(res.data || []);
        // console.log("res",res);
      } catch (err) {
        console.error(
          "Error fetching admins:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files?.length > 0) {
      setProfileFile(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setNewAdmin((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newAdmin).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (profileFile) formData.append("profileImage", profileFile);

      const res = await axios.post(
        "http://localhost:4002/api/superadmin/create-admin",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("newRes", res);

      setAdmins((prev) => [...prev, res.data.data]);
      notify.success("Admin created successfully 🎉");

      // Reset
      setNewAdmin({ fullName: "", email: "", password: "", contact: "" });
      setProfileFile(null);
      setPreviewImage("");
      setShowModal(false);
    } catch (err) {
      console.error("Error creating admin:", err.response?.data || err.message);
      notify.error(err.response?.data?.message || "Failed to create admin ❌");
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4002/api/superadmin/delete-admin/${id}`,
        { withCredentials: true }
      );
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      notify.success("Admin deleted successfully 🗑️");
    } catch (err) {
      console.error("Error deleting admin:", err.response?.data || err.message);
      notify.error(err.response?.data?.message || "Delete failed ❌");
    }
  };
  console.log("admin", admins);

  return (
    <div className="min-h-screen bg-[#1b1d2a] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Management</h1>
          <p className="text-gray-400 text-sm">Manage all admin users</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          + Create Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading admins...</p>
        ) : admins.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="text-center border-b">
                  <td className="px-4 py-2">
                    {admin.profileImage && (
                      <img
                        src={admin.profileImage}
                        alt="profile"
                        className="w-10 h-10 rounded-full mx-auto object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{admin.fullName}</td>
                  <td className="px-4 py-2">{admin.email}</td>
                  <td className="px-4 py-2">{admin.contact}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil />
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <Ban />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-4 text-gray-500 text-center">No admins found</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Create Admin</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={newAdmin.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={newAdmin.contact}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="w-full"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-16 h-16 rounded-full mx-auto"
                />
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
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
