import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaStethoscope, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TreatmentCard = ({ t }) => (
  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl hover:shadow-sm transition">
    <div className="relative w-5 h-5 mt-1 bg-blue-300 rounded-full before:absolute before:inset-0 before:m-1 before:bg-black before:rounded-full"></div>
    <div>
      <h4 className="font-semibold text-gray-800">{t.title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{t.description}</p>
    </div>
  </div>
);

const PatientsDepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:4002/api/admin/getdepartmenst/${id}`, { withCredentials: true })
      .then((res) => setDepartment(res.data.department))
      .catch((err) => console.error("Error fetching department:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (!department) return <p className="text-center mt-20 text-red-500">Department not found</p>;

  const totalDoctors = department.doctors?.length || 0;
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const doctorsToShow = department.doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Department Details</h1>
        <div
          className="flex items-center gap-2 mt-2 cursor-pointer text-gray-500 hover:underline"
          onClick={() => navigate("/admin/addDepartment")}
        >
          <FaArrowLeft className="text-xl" />
          Back to Department List
        </div>
      </div>

      {/* Department Image */}
      <div className="w-[130%] max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-10 bg-gray-50 flex justify-center items-center">
        <img
          src={department.image }
          alt={department.name}
          className="w-[130%] h-[400px] sm:h-[400px] md:h-[400px] lg:h-[550px] object-cover transition-all duration-500 rounded-xl"
        />
      </div>

      {/* Department Name and Small Doctor Avatars */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{department.name}</h1>
        {doctorsToShow.length > 0 && (
          <div className="flex -space-x-3 mt-3 sm:mt-0">
            {doctorsToShow.map((doc, i) => (
              <img
                key={i}
                src={doc.profileImage}
                alt={doc.fullName}
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ))}
            {totalDoctors > doctorsPerPage && (
              <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full text-sm text-gray-600">
                +{totalDoctors - doctorsPerPage}
              </div>
            )}
          </div>
        )}
      </div>

      {/* About */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">About</h3>
        <p className="text-gray-600 text-2xl leading-relaxed text-justify">{department.description}</p>
      </div>

      {/* Treatments */}
      {department.treatments?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Our Treatments</h3>
          <div className="space-y-5">
            {department.treatments.map((t, i) => (
              <TreatmentCard key={i} t={t} />
            ))}
          </div>
        </div>
      )}

      {/* Doctors */}
      {totalDoctors > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctorsToShow.map((doc) => (
              <Link key={doc.id} to={`/doctor/${doc.id}`}>
                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition duration-200">
                  <img
                    src={doc.profileImage }
                    alt={doc.fullName}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold text-gray-800">{doc.fullName}</h3>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                  <div className="flex gap-3 mt-3 text-gray-500">
                    <FaLinkedin className="cursor-pointer hover:text-blue-600" />
                    <FaTwitter className="cursor-pointer hover:text-blue-400" />
                    <FaInstagram className="cursor-pointer hover:text-pink-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Prev
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                  currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* View All Button */}
          {totalDoctors > doctorsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate(`/department/${department._id}/doctors`)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View All Doctors
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientsDepartmentDetails;
