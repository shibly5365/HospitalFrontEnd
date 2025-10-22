import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CreditCard, ChevronRight, ChevronLeft } from "lucide-react";

const doctors = [
  {
    id: 1,
    avatar: "/avatars/dr-smith.png",
    name: "Dr. John Smith",
    department: "Cardiology",
    nextAppointment: "2025-12-20 14:30",
    medicalHistory: [
      {
        date: "2025-09-20",
        prescription: "Continue blood pressure meds.",
        payment: { status: "Paid", amount: "₹1200" },
        notes: "Responded well, continue dosage.",
      },
      {
        date: "2025-10-18",
        prescription: "Adjust dosage for better control.",
        payment: { status: "Paid", amount: "₹800" },
        notes: "Slight fluctuations, adjusted plan.",
      },
    ],
  },
  {
    id: 2,
    avatar: "/avatars/dr-brown.png",
    name: "Dr. Emma Brown",
    department: "Dermatology",
    nextAppointment: "2026-01-18 10:00",
    medicalHistory: [
      {
        date: "2025-11-11",
        prescription: "Apply cream morning and night.",
        payment: { status: "Paid", amount: "₹900" },
        notes: "Mild improvement, follow-up in 2 months.",
      },
      {
        date: "2025-12-10",
        prescription: "Start oral medication with cream.",
        payment: { status: "Paid", amount: "₹1100" },
        notes: "Significant progress, review after 1 month.",
      },
    ],
  },
];

function ConsultationHistory() {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleView = (id) => {
    if (activeDoctor === id) {
      setActiveDoctor(null);
      setHistoryIndex(0);
    } else {
      setActiveDoctor(id);
      setHistoryIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        🩺 Your Consultation Overview
      </h2>

      <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
        {doctors.map((doc) => (
          <motion.div
            key={doc.id}
            layout
            className="min-w-[520px] sm:min-w-[600px] bg-gradient-to-br from-blue-50 to-white backdrop-blur-lg rounded-3xl shadow-xl border border-blue-100 flex-shrink-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
          >
            {/* Top-Right Small View Button */}
            <button
              onClick={() => handleView(doc.id)}
              className={`absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 ${
                activeDoctor === doc.id
                  ? "bg-blue-700 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {activeDoctor === doc.id ? "Hide" : "View"}
            </button>

            <div className="flex flex-col h-full">
              {/* Doctor Header */}
              <div className="flex items-center justify-between p-6 border-b border-blue-100">
                <div className="flex items-center gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-300 shadow-md object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {doc.name}
                    </h2>
                    <p className="text-sm font-medium text-blue-600">
                      {doc.department}
                    </p>
                  </div>
                </div>

                <div className="text-blue-700 flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
                  <Calendar className="w-5 h-5" />
                  {doc.nextAppointment}
                </div>
              </div>

              {/* History Slider */}
              <AnimatePresence>
                {activeDoctor === doc.id && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-blue-50 rounded-b-3xl border-t border-blue-100"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        Medical History
                      </h3>
                      <button className="text-blue-700 text-sm font-semibold hover:underline">
                        View All
                      </button>
                    </div>

                    {/* History Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          setHistoryIndex((prev) =>
                            prev > 0 ? prev - 1 : doc.medicalHistory.length - 1
                          )
                        }
                        className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition"
                      >
                        <ChevronLeft className="w-5 h-5 text-blue-700" />
                      </button>

                      {/* Single Prescription Card */}
                      <motion.div
                        key={historyIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-6"
                      >
                        <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex justify-between text-gray-700 font-semibold mb-2 text-sm">
                            <span>{doc.medicalHistory[historyIndex].date}</span>
                            <div className="flex items-center gap-2 text-green-600">
                              <CreditCard className="w-4 h-4" />
                              <span>
                                {
                                  doc.medicalHistory[historyIndex].payment
                                    .status
                                }{" "}
                                •{" "}
                                {
                                  doc.medicalHistory[historyIndex].payment
                                    .amount
                                }
                              </span>
                            </div>
                          </div>
                          <p className="text-blue-800 font-medium mb-1">
                            💊 {doc.medicalHistory[historyIndex].prescription}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {doc.medicalHistory[historyIndex].notes}
                          </p>
                        </div>
                      </motion.div>

                      <button
                        onClick={() =>
                          setHistoryIndex((prev) =>
                            prev < doc.medicalHistory.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition"
                      >
                        <ChevronRight className="w-5 h-5 text-blue-700" />
                      </button>
                    </div>

                    {/* Appointment Info */}
                    <div className="mt-6 py-3 px-4 bg-white rounded-xl text-center text-blue-700 font-semibold shadow-inner border border-blue-200">
                      <Calendar className="inline-block mr-2 w-5 h-5" />
                      Next Appointment: {doc.nextAppointment}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ConsultationHistory;
