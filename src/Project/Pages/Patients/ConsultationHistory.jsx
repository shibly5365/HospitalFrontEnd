import { useState, useEffect } from "react";
import DoctorCard from "./pages/Consultation/DoctorCardConsultation";
import SummaryStats from "./pages/Consultation/SummaryStats";
import { usePatient } from "../../../context/PatientContext";

function ConsultationHistory() {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Use Redux/Context instead of local state
  const { consultations: consultationsData } = usePatient();
  const { doctors, summary, loading, loadConsultations } = consultationsData;

  // Fetch consultations on component mount
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading consultation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Consultation History
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            View your medical records and upcoming appointments
          </p>
        </div>

        {/* Doctor Cards */}
        {doctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <p className="text-gray-500 font-medium">No consultation history found</p>
            <p className="text-gray-400 text-sm mt-2">
              Your consultation records will appear here once you have appointments
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {doctors.map((doc, index) => (
                <DoctorCard
                  key={doc.id || doc.doctorId || index}
                  doctor={doc}
                  activeDoctor={activeDoctor}
                  setActiveDoctor={setActiveDoctor}
                  historyIndex={historyIndex}
                  setHistoryIndex={setHistoryIndex}
                />
              ))}
            </div>

            {/* Summary */}
            <SummaryStats summary={summary} doctors={doctors} />
          </>
        )}
      </div>
    </div>
  );
}

export default ConsultationHistory;
