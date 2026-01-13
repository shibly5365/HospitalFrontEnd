import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function DoctorsCardAppointments({ doctor, selectedDate, selectedSlot, onOpenDetail }) {
  // console.log("doct",doctor);
  // console.log("data",selectedDate);
  // console.log("slot",selectedSlot);
  
  const navigate = useNavigate();

const handleBookNow = () => {
  if (!selectedDate || !selectedSlot) {
    return alert("Please select a date & time slot first.");
  }

  // Get doctor consultation fee
  // const consultationFee = doctor.rate;

  navigate("/patient/book-appointments", {
    state: {
      doctor,
      selectedDate,
      selectedSlot,
      consultationFee: doctor.rate , 
    },
  });
};


  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
    >
      <img
        src={doctor.img}
        alt={doctor.name}
        className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100 shadow-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{doctor.title}</p>
      <p className="text-sm text-gray-700 mt-1 font-medium">💲{doctor.rate}</p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookNow}
          disabled={!selectedDate || !selectedSlot}
          className={`px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 ${
            selectedDate && selectedSlot
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-200 hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Book Now
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenDetail(doctor)}
          className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
        >
          Detail
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DoctorsCardAppointments;
