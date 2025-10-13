import React from "react";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center text-2xl font-bold text-blue-800">
        <MdLocalHospital className="mr-2 text-blue-600" size={28} />
        MediCare Pro
      </div>

      <div className="hidden md:flex space-x-8">
        <a
          href="#features"
          className="text-gray-800 font-medium hover:text-blue-600"
        >
          Features
        </a>

        <a
          href="#community"
          className="text-gray-800 font-medium hover:text-blue-600"
        >
          Community
        </a>

        <a
          href="#insights"
          className="text-gray-800 font-medium hover:text-blue-600"
        >
          insights
        </a>
        <a href="#" className="text-gray-800 font-medium hover:text-blue-600">
          Contact
        </a>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-800 font-medium hover:text-blue-600"
        >
          Login
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Book Appointment
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
