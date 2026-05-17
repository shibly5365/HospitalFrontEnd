import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function DoctorsCardAppointments({
  doctor,
  selectedDate,
  selectedSlot,
  selectedDoctor, // ✅ selected doctor from parent
  onOpenDetail,
}) {
  const navigate = useNavigate();

  // ✅ Check if this card doctor is selected
  const isSelectedDoctor = selectedDoctor?.id === doctor.id;

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot || !isSelectedDoctor) {
      return alert("Please select doctor, date & time slot first.");
    }

    navigate("/patient/book-appointments", {
      state: {
        doctor,
        selectedDate,
        selectedSlot,
        consultationFee: doctor.rate,
      },
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
    >
      <img
        src={doctor.img}
        alt={doctor.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-gray-100 shadow-md mb-3"
      />

      <h3 className="text-lg font-semibold text-gray-900">
        {doctor.name}
      </h3>

      <p className="text-sm text-gray-500 mt-1">{doctor.title}</p>

      <p className="text-sm text-gray-700 mt-1 font-medium">
        💲{doctor.rate}
      </p>

      <div className="mt-4 flex flex-col gap-3 w-full">
        {/* ✅ Only selected doctor gets active button */}
        <motion.button
          whileHover={
            selectedDate && selectedSlot && isSelectedDoctor
              ? { scale: 1.05 }
              : {}
          }
          whileTap={
            selectedDate && selectedSlot && isSelectedDoctor
              ? { scale: 0.95 }
              : {}
          }
          onClick={handleBookNow}
          disabled={
            !selectedDate || !selectedSlot || !isSelectedDoctor
          }
          className={`px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 ${
            selectedDate &&
            selectedSlot &&
            isSelectedDoctor
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200 hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSelectedDoctor ? "Book Now" : "Select This Doctor"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenDetail(doctor)}
          className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
        >
          Detail
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DoctorsCardAppointments;