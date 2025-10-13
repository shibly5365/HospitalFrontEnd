import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Units/notification";

const AdminReceptionist = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch receptionists from backend
  useEffect(() => {
    const fetchReceptionists = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getAll-Receptionist",
          { withCredentials: true }
        );
        console.log(res);

        if (res.data.success) {
          setReceptionists(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching receptionists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionists();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this receptionist?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:4002/api/admin/deleted-Receptionist/${id}`,
        { withCredentials: true }
      );
      console.log("delete",res.data);
      
      if (res.data.success) {
        notify.success("Receptionist deleted successfully!");
        setReceptionists((prev) => prev.filter((r) => r._id !== id));
      } else {
        notify.error(res.data.message || "Failed to delete receptionist");
      }
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong!");
    }
  };
  console.log(receptionists);

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-gray-300">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold mb-6">Receptionists</h1>

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none"
          />
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm" onClick={()=>navigate("/admin/creating-receptionist")} >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Unique ID</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Patients Added</th>
                <th className="p-3 text-center">Appointments Booked</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.length > 0 ? (
                receptionists.map((r, index) => (
                  <tr
                    key={r._id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3">{r.fullName}</td>
                    <td className="p-3">{r.age}</td>
                    <td className="p-3">{r.gender}</td>
                    <td className="p-3">{r.employeeId}</td>
                    <td className="p-3">{r.contact}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3 text-center">{r.patientsAdded || 0}</td>
                    <td className="p-3 text-center">
                      {r.appointmentsBooked || 0}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        className="p-2 border rounded-lg"
                        onClick={() => navigate(`/admin/receptionist/${r._id}`)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="p-2 border rounded-lg"
                        onClick={() => handleDelete(r._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    No receptionists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReceptionist;
