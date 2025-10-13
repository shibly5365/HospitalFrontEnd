import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDepartment = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/admin/getdepartmenst",
          { withCredentials: true }
        );
        setDepartments(res.data.data); // backend should return array inside data
        setLoading(false);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div className="p-8 text-lg font-medium">Loading departments...</div>;
  }

  return (
    <div className="p-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Departments</h1>
        <button
          onClick={() => navigate("/admin/addDepartment")}
          className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-green-700 transition"
        >
          + Add Department
        </button>
      </div>

      {/* Grid with 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {departments.map((dept) => (
          <div
            key={dept._id || dept.id}
            className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all bg-white h-[500px] w-full"
          >
            {/* Department Image */}
            <img
              src={dept.image}
              alt={dept.name}
              className="h-[240px] w-full object-cover"
            />

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between h-[calc(100%-220px)]">
              <div>
                <h2 className="text-2xl font-semibold">{dept.name}</h2>
                <p className="text-base text-gray-600 mt-2 line-clamp-5">
                  {dept.description}
                </p>
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center mt-6">
                {/* Doctors Avatars */}
                <div className="flex -space-x-3">
                  {dept.doctors?.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="doctor"
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                  ))}
                  <span className="ml-3 text-sm text-gray-500">
                    + {dept.others || 0} others
                  </span>
                </div>

                {/* See Detail Button */}
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700"
                  onClick={() =>
                    navigate(`/admin/departmetsDetails/${dept._id || dept.id}`)
                  }
                >
                  See Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDepartment;
