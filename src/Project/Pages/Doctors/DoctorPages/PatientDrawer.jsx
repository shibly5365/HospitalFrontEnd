import React, { useState } from "react";
import PatientHeader from "./Drawer/PatientHeader";
import PatientFooter from "./Drawer/PatientFooter";

// Tabs
import PatientQuickInfo from "./Drawer/PatientQuickInfo";
import PatientContactInfo from "./Drawer/PatientContactInfo";
import PatientMedicalInfo from "./Drawer/PatientMedicalInfo";
import PatientVitalSigns from "./Drawer/PatientVitalSigns";
import PatientAppointments from "./Drawer/PatientAppointments";
import PatientNotes from "./Drawer/PatientNotes";
import PatientHistory from "./Drawer/PatientHistory";        // ⬅️ add this
import PatientPrescriptions from "./Drawer/PatientPrescriptions"; // ⬅️ add this


// New Components (You can create them later)
// includes prescription list

const PatientDrawer = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState("info");

  if (!isOpen || !patient) return null;

  // console.log(patient);
  
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[650px] lg:w-[720px] 
          bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl z-50 transform 
          transition-transform duration-300 ease-out overflow-hidden 
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-slate-50 to-blue-100 shadow-md">
          <PatientHeader patient={patient} onClose={onClose} />
        </div>

        {/* 🔹 Tab Navigation */}
        <div className="flex justify-around border-b border-slate-300 bg-white sticky top-[70px] z-10">
          {[
            { id: "info", label: "Patient Info" },
            { id: "history", label: "History" },
            { id: "prescriptions", label: "Prescriptions" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 text-sm font-semibold py-3 transition-all duration-200 ${activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-blue-600"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔸 Scrollable Content */}
        <div className="h-[calc(100%-230px)] overflow-y-auto px-6 py-6 space-y-6">
          {activeTab === "info" && (
            <>
              <PatientQuickInfo patient={patient} />
              <PatientContactInfo patient={patient} />
              <PatientMedicalInfo patient={patient} />
              <PatientVitalSigns patient={patient} />
              <PatientNotes patient={patient} />
            </>
          )}

          {activeTab === "history" && (
            <>
              <PatientAppointments data={patient} />
              <PatientHistory doctor={patient} />
            </>
          )}

          {activeTab === "prescriptions" && (
            <>
              <PatientPrescriptions patient={patient} />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20">
          <PatientFooter />
        </div>
      </div>
    </>
  );
};

export default PatientDrawer;
