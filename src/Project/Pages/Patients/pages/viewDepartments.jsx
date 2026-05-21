import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiClient } from "../../../../services/queryClient";
import {
  FaArrowLeft,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const TreatmentCard = ({ t }) => (
  <div
    className="
      theme-soft
      theme-border
      border
      p-4
      rounded-2xl
      hover:shadow-md
      transition-all
      duration-300
      flex
      items-start
      gap-4
    "
  >
    <div
      className="
        relative
        w-5
        h-5
        mt-1
        rounded-full
        bg-blue-400
        before:absolute
        before:inset-0
        before:m-1
        before:rounded-full
        before:bg-white
      "
    />

    <div>
      <h4 className="font-semibold theme-text">
        {t.title}
      </h4>

      <p className="theme-text-muted text-sm leading-relaxed mt-1">
        {t.description}
      </p>
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
    apiClient
      .get(`/admin/getdepartmenst/${id}`, {
        withCredentials: true,
      })
      .then((res) =>
        setDepartment(res.data.department)
      )
      .catch((err) =>
        console.error(
          "Error fetching department:",
          err
        )
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-20 theme-text-muted">
        Loading...
      </p>
    );
  }

  if (!department) {
    return (
      <p className="text-center mt-20 text-red-500">
        Department not found
      </p>
    );
  }

  const totalDoctors =
    department.doctors?.length || 0;

  const totalPages = Math.ceil(
    totalDoctors / doctorsPerPage
  );

  const indexOfLastDoctor =
    currentPage * doctorsPerPage;

  const indexOfFirstDoctor =
    indexOfLastDoctor - doctorsPerPage;

  const doctorsToShow =
    department.doctors.slice(
      indexOfFirstDoctor,
      indexOfLastDoctor
    );

  return (
    <div className="theme-bg min-h-screen px-4 sm:px-6 lg:px-20 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold theme-text">
          Department Details
        </h1>

        <div
          className="
            flex
            items-center
            gap-2
            mt-3
            cursor-pointer
            theme-text-muted
            hover:text-blue-500
            transition-all
          "
          onClick={() =>
            navigate(
              "/patient/patient-departments"
            )
          }
        >
          <FaArrowLeft className="text-lg" />

          <span>
            Back to Department List
          </span>
        </div>
      </div>

      {/* Department Image */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-3xl
          shadow-xl
          mb-10
          theme-card
        "
      >
        <img
          src={department.image}
          alt={department.name}
          className="
            w-full
            h-[220px]
            sm:h-[320px]
            md:h-[420px]
            lg:h-[550px]
            object-cover
            transition-all
            duration-500
            hover:scale-105
          "
        />
      </div>

      {/* Department Header */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-start
          sm:items-center
          gap-4
          mb-8
        "
      >
        <h1 className="text-3xl font-bold theme-text">
          {department.name}
        </h1>

        {doctorsToShow.length > 0 && (
          <div className="flex -space-x-3">
            {doctorsToShow.map((doc, i) => (
              <img
                key={i}
                src={doc.profileImage}
                alt={doc.fullName}
                className="
                  w-10
                  h-10
                  rounded-full
                  border-2
                  border-white
                  object-cover
                  shadow-md
                "
              />
            ))}

            {totalDoctors > doctorsPerPage && (
              <div
                className="
                  w-10
                  h-10
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
                "
              >
                +
                {totalDoctors -
                  doctorsPerPage}
              </div>
            )}
          </div>
        )}
      </div>

      {/* About */}
      <div className="max-w-5xl">
        <h3 className="text-2xl font-semibold theme-text mb-3">
          About
        </h3>

        <p
          className="
            theme-text-muted
            text-sm
            sm:text-base
            leading-8
            break-words
          "
        >
          {department.description}
        </p>
      </div>

      {/* Treatments */}
      {department.treatments?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold theme-text mb-5">
            Our Treatments
          </h3>

          <div className="space-y-5">
            {department.treatments.map(
              (t, i) => (
                <TreatmentCard
                  key={i}
                  t={t}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* Doctors */}
      {totalDoctors > 0 && (
        <div className="mt-14">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold theme-text">
              Our Team
            </h2>

            <button
              onClick={() => {
                navigate(
                  `patient-departments/${department._id}`
                );
              }}
className="
  text-sm
  theme-text
  hover:opacity-80
  underline
  transition
"
            >
              View All
            </button>
          </div>

          {/* Doctor Cards */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-5
              gap-6
            "
          >
            {doctorsToShow.map((doc) => (
              <Link
                key={doc.id}
                to={`/doctor/${doc.id}`}
              >
                <div
                  className="
                    theme-card
                    rounded-3xl
                    p-6
                    flex
                    flex-col
                    items-center
                    text-center
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    h-full
                  "
                >
                  {/* Doctor Image */}
                  <div
                    className="
                      w-24
                      h-24
                      rounded-full
                      overflow-hidden
                      mb-4
                      border-4
                      border-blue-100
                      shadow-md
                    "
                  >
                    <img
                      src={doc.profileImage}
                      alt={doc.fullName}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </div>

                  {/* Doctor Info */}
                  <h3 className="font-bold text-lg theme-text">
                    {doc.fullName}
                  </h3>

                  <p className="theme-text-muted text-sm mt-1">
                    {doc.specialization}
                  </p>

                  {/* Social */}
                  <div
                    className="
                      flex
                      gap-4
                      mt-4
                      text-gray-400
                    "
                  >
                    <FaLinkedin
                      className="
                        cursor-pointer
                        hover:text-blue-600
                        transition
                      "
                    />

                    <FaTwitter
                      className="
                        cursor-pointer
                        hover:text-sky-400
                        transition
                      "
                    />

                    <FaInstagram
                      className="
                        cursor-pointer
                        hover:text-pink-500
                        transition
                      "
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-gray-200
                  text-black
                  disabled:opacity-50
                "
              >
                Previous
              </button>

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-blue-600
                  text-white
                  disabled:opacity-50
                "
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientsDepartmentDetails;