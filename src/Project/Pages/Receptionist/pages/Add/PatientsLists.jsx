import { apiClient } from "../../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Settings } from "lucide-react";

const PatientsLists = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "/receptionist/patients",
          { withCredentials: true }
        );

        if (response.data.success && response.data.data) {
          setPatients(response.data.data.patients || []);
        } else {
          setPatients([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div className="p-6">Loading patients...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Filter patients based on search query
  const filteredPatients = patients.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.fullName?.toLowerCase().includes(query) ||
      p.patientId?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query) ||
      p.contact?.toLowerCase().includes(query)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 p-4 flex justify-between items-center text-white shadow">
        <h1 className="text-lg font-bold">Patients List</h1>
        <div className="flex gap-3 items-center">
          <button className="bg-white text-blue-500 px-3 py-1 rounded-lg shadow flex items-center gap-2">
            <Settings size={16} /> Settings
          </button>
          <button className="bg-red-500 px-3 py-1 rounded-lg shadow text-white">
            + Add Patient
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Patients List</h2>
            <input
              type="text"
              placeholder="Search by name, ID, email, or contact..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Patient ID</th>
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Last Visit</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No patients found
                  </td>
                </tr>
              ) : (
                currentPatients.map((p) => (
                  <tr key={p._id || p.patientId} className="hover:bg-gray-50">
                    <td className="p-2 border">{p.patientId || "-"}</td>
                    <td className="p-2 border">{p.fullName || p.name || "-"}</td>
                    <td className="p-2 border">{p.gender || "-"}</td>
                    <td className="p-2 border">{p.summary?.lastVisitDate || "-"}</td>
                    <td className="p-2 border">{p.age || "-"}</td>
                    <td className="p-2 border flex gap-2">
                      <button className="text-green-600 hover:text-green-800">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 border rounded bg-gray-100"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 border rounded bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsLists;
