import React, { useState, useEffect } from "react";
import { Users, CheckCircle } from "lucide-react";

const PatientStep = ({ patients, selectedPatient, onSelectPatient }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredPatients([]);
            return;
        }
        const filtered = patients.filter((p) =>
            `${p.fullName} ${p.email} ${p.contact || ""} ${p.patientId || ""}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [searchTerm, patients]);

    const handleSelectPatient = (patient) => {
        onSelectPatient(patient);
        setSearchTerm(patient.fullName);
        setFilteredPatients([]);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Patient</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Patient
                </label>
                <input
                    type="text"
                    placeholder="Search by name, email, contact, or patient ID..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!e.target.value && selectedPatient) onSelectPatient(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {filteredPatients.length > 0 && (
                    <div className="mt-2 border rounded-lg max-h-60 overflow-auto bg-white shadow-lg">
                        {filteredPatients.map((p) => (
                            <div
                                key={p._id}
                                onClick={() => handleSelectPatient(p)}
                                className={`p-3 hover:bg-blue-50 cursor-pointer border-b ${selectedPatient?._id === p._id ? "bg-blue-100" : ""
                                    }`}
                            >
                                <div className="font-semibold">{p.fullName}</div>
                                <div className="text-sm text-gray-600">
                                    {p.email} | {p.contact || "N/A"} | ID: {p.patientId || p._id}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedPatient && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle size={20} />
                            <span className="font-semibold">Selected: {selectedPatient.fullName}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientStep;