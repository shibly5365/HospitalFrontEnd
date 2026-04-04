import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";

export const ProfileUpload = ({ preview, setPreview, register }) => {
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center mb-6"
    >
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-400 shadow-lg bg-gradient-to-br from-teal-100 to-emerald-100">
          <img
            src={
              preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 p-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FaCamera className="w-3 h-3 text-white" />
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          {...register("profileImage", {
            onChange: (e) => {
              handleImageChange(e);
            },
          })}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">Click camera to upload photo</p>
      <p className="text-xs text-gray-300">JPEG, PNG, WEBP (Max 5MB)</p>
    </motion.div>
  );
};
