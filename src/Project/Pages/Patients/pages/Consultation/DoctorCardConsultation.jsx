import { Phone, Video, Mail } from "lucide-react";
import NextAppointmentBadge from "./NextAppointmentBadge";
import MedicalHistoryCard from "./MedicalHistoryCard";

export default function DoctorCard({ doctor, activeDoctor, setActiveDoctor, historyIndex, setHistoryIndex }) {
  const toggleView = () => {
    setActiveDoctor(activeDoctor === doctor.id ? null : doctor.id);
    setHistoryIndex(0);
  };

  const nextHistory = () => {
    setHistoryIndex((prev) => (prev < doctor.medicalHistory.length - 1 ? prev + 1 : 0));
  };

  const prevHistory = () => {
    setHistoryIndex((prev) => (prev > 0 ? prev - 1 : doctor.medicalHistory.length - 1));
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 pb-20">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleView}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg ${
              activeDoctor === doctor.id ? "bg-white text-purple-600" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {activeDoctor === doctor.id ? "Hide Details" : "View History"}
          </button>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 shadow-lg">
              <span className="text-xs font-bold text-purple-600">⭐ {doctor.rating}</span>
            </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
            <p className="text-sm text-white/90 font-medium mb-1">{doctor.department}</p>
            <p className="text-xs text-white/80">{doctor.specialization}</p>
          </div>
        </div>

        <NextAppointmentBadge nextAppointment={doctor.nextAppointment} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 pt-14 pb-4 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition text-blue-600 text-sm font-medium">
          <Phone className="w-4 h-4" /> Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition text-purple-600 text-sm font-medium">
          <Video className="w-4 h-4" /> Video
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-pink-50 hover:bg-pink-100 rounded-xl transition text-pink-600 text-sm font-medium">
          <Mail className="w-4 h-4" /> Message
        </button>
      </div>

      {/* Medical History */}
      {activeDoctor === doctor.id && (
        <MedicalHistoryCard
          doctor={doctor}
          historyIndex={historyIndex}
          nextHistory={nextHistory}
          prevHistory={prevHistory}
        />
      )}
    </div>
  );
}
