import React from "react";
import { FaVideo, FaUserMd, FaNotesMedical, FaFileAlt } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDelete } from "react-icons/ai";

const Consultation = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <FaNotesMedical className="text-blue-600" /> Hospital Consultation Dashboard
        </h1>
        <p className="text-gray-600 text-sm">
          Manage patient consultations, prescriptions, and medical records
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Consultation Details */}
        <div className="col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FaUserMd /> Consultation Details
            </h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <FaVideo /> Start Video Call
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><strong>Doctor:</strong> Dr. Sarah Johnson</div>
            <div><strong>Age:</strong> 45</div>
            <div><strong>Gender:</strong> Male</div>
            <div className="flex items-center gap-1">
              <AiOutlineCalendar /> 2024-12-22
            </div>
            <div><strong>Patient Name:</strong> John Mitchell</div>
            <div className="flex items-center gap-1">
              <AiOutlineClockCircle /> 10:30 AM
            </div>
            <div><strong>Blood Type:</strong> <span className="text-red-600">B+</span></div>
          </div>
        </div>

        {/* Previous Records */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Previous Records</h2>
          <div className="space-y-4 text-sm">
            <div className="border rounded-lg p-3">
              <p className="font-medium">Nov 15, 2024</p>
              <p className="text-gray-600 text-xs">Dr. Sarah Johnson</p>
              <p>Annual Checkup</p>
              <button className="text-blue-600 text-xs mt-1">View</button>
            </div>
            <div className="border rounded-lg p-3">
              <p className="font-medium">Sep 22, 2024</p>
              <p className="text-gray-600 text-xs">Dr. Michael Chen</p>
              <p>Hypertension Follow-up</p>
              <button className="text-blue-600 text-xs mt-1">View</button>
            </div>
            <div className="border rounded-lg p-3">
              <p className="font-medium">Jul 10, 2024</p>
              <p className="text-gray-600 text-xs">Dr. Sarah Johnson</p>
              <p>Diabetes Management</p>
              <button className="text-blue-600 text-xs mt-1">View</button>
            </div>
          </div>
          <button className="w-full mt-4 border rounded-lg py-2 text-sm hover:bg-gray-100">
            View All Records
          </button>
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="font-semibold mb-4">Vital Signs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 border rounded-xl">Blood Pressure: <strong>120/80 mmHg</strong></div>
          <div className="p-4 border rounded-xl">Heart Rate: <strong>72 bpm</strong></div>
          <div className="p-4 border rounded-xl">Temperature: <strong>98.6°F</strong></div>
          <div className="p-4 border rounded-xl">Weight: <strong>180 lbs</strong></div>
          <div className="p-4 border rounded-xl">Height: <strong>5'10"</strong></div>
          <div className="p-4 border rounded-xl">Blood Sugar: <strong>95 mg/dL</strong></div>
          <div className="p-4 border rounded-xl">Hemoglobin: <strong>14.2 g/dL</strong></div>
          <div className="p-4 border rounded-xl">Blood Type: <strong>B+</strong></div>
        </div>
      </div>

      {/* Prescription */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="font-semibold mb-4">Prescription</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="border rounded p-2" placeholder="Medicine Name" />
          <input className="border rounded p-2" placeholder="Dosage e.g., 500mg" />
          <select className="border rounded p-2">
            <option>Select frequency</option>
            <option>Once daily</option>
            <option>Twice daily</option>
            <option>Three times daily</option>
          </select>
          <input className="border rounded p-2" placeholder="Duration e.g., 7 days" />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg">+ Add Medicine</button>

        <table className="w-full mt-6 text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Medicine Name</th>
              <th className="p-2">Dosage</th>
              <th className="p-2">Frequency</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Amoxicillin</td>
              <td className="p-2">500mg</td>
              <td className="p-2">Three times daily</td>
              <td className="p-2">7 days</td>
              <td className="p-2">
                <button className="text-red-600"><AiOutlineDelete /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes & Diagnosis */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="font-semibold mb-4">Notes & Diagnosis</h2>
        <div className="mb-4">
          <h3 className="font-medium">Diagnosis</h3>
          <p className="bg-gray-100 p-2 rounded-lg text-sm">Upper Respiratory Tract Infection</p>
        </div>
        <div>
          <h3 className="font-medium">Doctor Notes</h3>
          <p className="bg-gray-100 p-2 rounded-lg text-sm">
            Patient presents with mild cold symptoms. No fever observed. Throat appears slightly red but not severely inflamed. Recommended rest and increased fluid intake.
          </p>
        </div>
      </div>

      {/* Follow-up & Attachments */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="font-semibold mb-4">Follow-up & Attachments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="date" className="border rounded p-2" defaultValue="2024-12-29" />
          <div className="flex items-center gap-2">
            <input type="file" className="border rounded p-2" />
          </div>
        </div>
        <div className="border rounded-lg p-3 text-sm flex justify-between items-center">
          <span>chest_xray_report.pdf (2.3 MB)</span>
          <button className="text-red-600"><AiOutlineDelete /></button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Save Consultation
        </button>
      </div>
    </div>
  );
};

export default Consultation;
