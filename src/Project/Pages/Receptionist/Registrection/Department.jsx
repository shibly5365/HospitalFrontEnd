import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Sun,
  Activity,
  Bone,
  Radio,
  Brain,
  Venus,
} from "lucide-react";

// Predefined icons and colors
const departmentIcons = {
  "General Medicine": { icon: Stethoscope, color: "from-blue-400 to-blue-600" },
  Cardiology: { icon: HeartPulse, color: "from-red-400 to-red-600" },
  Pediatrics: { icon: Baby, color: "from-pink-400 to-pink-600" },
  Dermatology: { icon: Sun, color: "from-yellow-400 to-yellow-600" },
  "Internal Medicine": { icon: Activity, color: "from-green-400 to-green-600" },
  Orthopedics: { icon: Bone, color: "from-purple-400 to-purple-600" },
  Neurology: { icon: Brain, color: "from-indigo-400 to-indigo-600" },
  Gynecology: { icon: Venus, color: "from-rose-400 to-rose-600" },
  Radiology: { icon: Radio, color: "from-teal-400 to-teal-600" },
};

const Department = ({ onNext, onBack }) => {
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4002/api/receptionist/getdepartmenst",
          { withCredentials: true }
        );
        setDepartments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading departments...</p>;

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
        Select Department
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Choose the department you want to consult with
      </p>

      {/* Department Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const { icon: Icon, color } = departmentIcons[dept.name] || {
            icon: Stethoscope,
            color: "from-gray-400 to-gray-600",
          };
          return (
            <div
              key={dept._id}
              onClick={() => setSelected(dept._id)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer border transition-all duration-300
                ${
                  selected === dept._id
                    ? "bg-blue-600 text-white shadow-lg scale-105 border-2 border-blue-500"
                    : "bg-gray-50 hover:shadow-md hover:bg-gray-100 border-gray-200"
                }`}
            >
              <div
                className={`p-4 rounded-full mb-4 transition-all duration-300
                  ${
                    selected === dept._id
                      ? "bg-white text-blue-600 shadow-md"
                      : `bg-gradient-to-br ${color} text-white shadow`
                  }`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <p
                className={`font-medium text-center text-sm sm:text-base ${
                  selected === dept._id ? "text-white" : "text-gray-800"
                }`}
              >
                {dept.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-sm transition"
        >
          Previous
        </button>
        <button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          className={`px-8 py-2 rounded-lg font-semibold transition
            ${
              selected
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Department;
