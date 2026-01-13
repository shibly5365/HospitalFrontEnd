import React, { useState, useEffect } from "react";
import axios from "axios";
import { Building2, Users } from "lucide-react";
import { notify } from "../../../../../Units/notification";

export default function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4002/api/receptionist/departments",
        { withCredentials: true }
      );

      if (res.data.success && res.data.data) {
        setDepartments(res.data.data.departments || []);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      notify.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Departments</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading departments...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{dept.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Users size={14} />
                      {dept.doctorCount || 0} Doctors
                    </p>
                  </div>
                </div>
                {dept.description && (
                  <p className="text-sm text-gray-600">{dept.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
