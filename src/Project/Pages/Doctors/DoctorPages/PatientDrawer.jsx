// PatientDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, User } from "lucide-react";

const tabs = ["Personal", "History", "Notes"];

const PatientDrawer = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <AnimatePresence>
      {isOpen && patient && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="relative bg-white w-[320px] sm:w-[360px] md:w-[400px] lg:w-[420px] h-full shadow-xl overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-xl">
                  {patient.fullName?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{patient.fullName}</h2>
                  <p className="text-base text-gray-600">
                    {patient.age} years • {patient.gender}
                  </p>
                  <span className="mt-1 inline-block bg-indigo-100 text-indigo-600 text-xs sm:text-sm px-2 py-1 rounded-md">
                    Medium Priority
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex px-6 border-b space-x-4 mt-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm sm:text-base font-medium ${
                    activeTab === tab
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "Personal" && (
                <div className="border rounded-xl p-5 shadow-sm bg-white">
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-4">
                    <User size={20} className="text-indigo-600" />
                    <h3 className="font-semibold text-gray-700 text-lg">
                      Personal Information
                    </h3>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-y-4 text-base">
                    <p>
                      <span className="font-medium">Full Name</span>
                      <br />
                      {patient.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth</span>
                      <br />
                      {patient.dob
                        ? new Date(patient.dob).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Gender</span>
                      <br />
                      {patient.gender}
                    </p>
                    <p>
                      <span className="font-medium">Blood Type</span>
                      <br />
                      {patient.bloodType || "N/A"}
                    </p>
                  </div>

                  <hr className="my-5" />

                  {/* Contact Info */}
                  <h4 className="font-semibold text-gray-700 text-lg mb-3">
                    Contact Information
                  </h4>
                  <div className="text-base space-y-3">
                    <p className="flex items-center gap-2">
                      <Phone size={18} className="text-gray-500" />
                      {typeof patient.phone === "string"
                        ? patient.phone
                        : patient.phone?.number || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={18} className="text-gray-500" />
                      {patient.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-500" />
                      {patient.address
                        ? `${patient.address.street}, ${patient.address.city}, ${patient.address.state} - ${patient.address.zip}`
                        : "N/A"}
                    </p>
                  </div>

                  <hr className="my-5" />

                  {/* Emergency Contact */}
                  <p className="text-base">
                    <span className="font-semibold text-gray-700">
                      Emergency Contact
                    </span>
                    <br />
                    {patient.emergencyContact
                      ? `${patient.emergencyContact.name || ""} (${
                          patient.emergencyContact.number || "N/A"
                        })`
                      : "N/A"}
                  </p>
                </div>
              )}
              {activeTab === "History" && (
                <p className="text-gray-600 text-base">
                  Patient history goes here...
                </p>
              )}
              {activeTab === "Notes" && (
                <p className="text-gray-600 text-base">
                  Doctor notes go here...
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PatientDrawer;
