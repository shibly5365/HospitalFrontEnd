import React, { useState } from "react";
import { motion } from "framer-motion";

function DoctorDetail({ doctor, onClose, onBook }) {
  const [currentReview, setCurrentReview] = useState(0);

  const handleNext = () =>
    setCurrentReview((prev) => (prev === doctor.reviews.length - 1 ? 0 : prev + 1));
  const handlePrev = () =>
    setCurrentReview((prev) => (prev === 0 ? doctor.reviews.length - 1 : prev - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100 w-full max-w-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-gray-900">Doctor Details</div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          ✕
        </motion.button>
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={doctor.img}
          alt={doctor.name}
          className="w-36 h-36 rounded-xl object-cover shadow-lg border-4 border-white"
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
            <span>{doctor.title}</span>
            <span>💲{doctor.rate}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-semibold text-gray-800 mb-2">Bio</div>
        <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl">{doctor.bio}</p>
      </div>

      <div className="mb-4">
        <div className="font-semibold text-gray-800 mb-2">Experience</div>
        <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl">{doctor.experience}</p>
      </div>

      <div className="mb-6">
        <div className="font-semibold text-gray-800 mb-2">Specialty</div>
        <div className="flex flex-wrap gap-2">
          {(Array.isArray(doctor.specialty) ? doctor.specialty : [doctor.specialty])?.map(
            (s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100"
              >
                {s}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="font-semibold text-gray-800 mb-2">Reviews</div>
        <div className="bg-gray-50 p-4 rounded-xl relative">
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.416 2.668c-.784.57-1.839-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.571 9.397c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
            ))}
            <span className="text-sm font-semibold text-gray-700">({doctor.rating})</span>
          </div>

          <motion.p
            key={currentReview}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-600 italic text-center"
          >
            "{doctor.reviews?.[currentReview]}"
          </motion.p>

          {currentReview > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-500 hover:bg-purple-50 hover:text-purple-600 shadow-sm transition-all duration-200"
            >
              {"<"}
            </button>
          )}
          {currentReview < (doctor.reviews?.length || 0) - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-500 hover:bg-purple-50 hover:text-purple-600 shadow-sm transition-all duration-200"
            >
              {">"}
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onBook(doctor)}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg"
        >
          Book Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-purple-300 hover:bg-purple-50"
        >
          Chat
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DoctorDetail;
