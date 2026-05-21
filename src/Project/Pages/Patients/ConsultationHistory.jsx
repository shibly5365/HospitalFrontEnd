import { useState, useEffect } from "react";
import DoctorCard from "./pages/Consultation/DoctorCardConsultation";
import SummaryStats from "./pages/Consultation/SummaryStats";
import { usePatient } from "../../../context/PatientContext";
import PatientLoading from "../../../skeletons/SkeletonBase";

function ConsultationHistory() {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [historyIndex, setHistoryIndex] = useState(0);

  const {
    consultations: consultationsData,
  } = usePatient();

  const {
    doctors,
    summary,
    loading,
    loadConsultations,
  } = consultationsData;

  useEffect(() => {
    loadConsultations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    if (activeDoctor === id) {
      setActiveDoctor(null);
      setHistoryIndex(0);
    } else {
      setActiveDoctor(id);
      setHistoryIndex(0);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return <PatientLoading />;
  }

  return (
    <div
      className="
        min-h-screen
        theme-bg
        py-8
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div className="mb-8 md:mb-12">
          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              bg-gradient-to-r
              from-blue-600
              via-purple-600
              to-pink-600
              bg-clip-text
              text-transparent
            "
          >
            Consultation History
          </h1>

          <p className="theme-text-muted text-sm md:text-base mt-2">
            View your medical records and
            upcoming appointments
          </p>
        </div>

        {/* ================= EMPTY STATE ================= */}

        {doctors.length === 0 ? (
          <div
            className="
              theme-card
              rounded-3xl
              p-10
              text-center
              shadow-lg
            "
          >
            <div
              className="
                w-16
                h-16
                theme-soft
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              "
            >
              <svg
                className="w-8 h-8 theme-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <p className="theme-text font-semibold">
              No consultation history found
            </p>

            <p className="theme-text-muted text-sm mt-2">
              Your consultation records will
              appear here once you have
              appointments
            </p>
          </div>
        ) : (
          <>
            {/* ================= DOCTOR CARDS ================= */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >
              {doctors.map((doc, index) => (
                <DoctorCard
                  key={
                    doc.id ||
                    doc.doctorId ||
                    index
                  }
                  doctor={doc}
                  activeDoctor={
                    activeDoctor
                  }
                  setActiveDoctor={
                    setActiveDoctor
                  }
                  historyIndex={
                    historyIndex
                  }
                  setHistoryIndex={
                    setHistoryIndex
                  }
                  handleView={
                    handleView
                  }
                />
              ))}
            </div>

            {/* ================= SUMMARY ================= */}

            <div className="mt-8">
              <SummaryStats
                summary={summary}
                doctors={doctors}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConsultationHistory;