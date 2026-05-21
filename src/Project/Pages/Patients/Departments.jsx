import { apiClient } from "../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLoading from "../../../skeletons/SkeletonBase";

const PtientsDepartment = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiClient.get(
          "/admin/getdepartmenst",
          {
            withCredentials: true,
          }
        );

        setDepartments(res.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching departments:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <PatientLoading />;
  }

  return (
    <div className="p-4 md:p-8 theme-bg min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold theme-text">
            Departments
          </h1>

          <p className="theme-text-muted mt-2">
            Explore all available hospital departments
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {departments.map((dept) => (
          <div
            key={dept._id || dept.id}
            className="
              theme-card
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              border
              theme-border
            "
          >
            {/* Department Image */}
            <div className="relative overflow-hidden">
              <img
                src={dept.image}
                alt={dept.name}
                className="
                  h-[240px]
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between min-h-[260px]">
              <div>
                <h2 className="text-2xl font-bold theme-text mb-3">
                  {dept.name}
                </h2>

                <p className="theme-text-muted text-sm leading-7 line-clamp-5">
                  {dept.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8">
                {/* Doctors */}
                <div className="flex -space-x-3">
                  {dept.doctors
                    ?.slice(0, 5)
                    .map((doctor, index) => (
                      <img
                        key={index}
                        src={
                          doctor.userId
                            ?.profileImage ||
                          "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                        }
                        alt="doctor"
                        className="
                          w-12
                          h-12
                          rounded-full
                          border-2
                          border-white
                          object-cover
                          shadow-md
                        "
                      />
                    ))}

                  {/* More Count */}
                  {dept.doctors?.length > 5 && (
                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-semibold
                        bg-blue-600
                        text-white
                        border-2
                        border-white
                        shadow-md
                      "
                    >
                      +{dept.doctors.length - 5}
                    </div>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/patient/patient-departments/${
                        dept._id || dept.id
                      }`
                    )
                  }
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    font-medium
                    text-sm
                    text-white
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    hover:scale-105
                    transition-all
                    duration-300
                    shadow-md
                  "
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!departments.length && (
        <div
          className="
            theme-card
            rounded-3xl
            p-10
            text-center
            mt-10
          "
        >
          <h2 className="text-2xl font-bold theme-text mb-2">
            No Departments Found
          </h2>

          <p className="theme-text-muted">
            Departments are not available right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default PtientsDepartment;