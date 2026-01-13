import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const PatientContactInfo = ({ patient }) => {
    // console.log("arejusn",patient);
    
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Phone size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
            </div>
            <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <Phone size={16} className="text-slate-600 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs text-slate-600 mb-0.5">Phone Number</p>
                        <p className="text-sm font-semibold text-slate-900">{patient.patient.phone || "Not provided"}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <Mail size={16} className="text-slate-600 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs text-slate-600 mb-0.5">Email Address</p>
                        <p className="text-sm font-semibold text-slate-900">{patient.patient.email || "Not provided"}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <MapPin size={16} className="text-slate-600 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs text-slate-600 mb-0.5">Address</p>
                        <p className="text-sm font-semibold text-slate-900">
                            {patient.address
                                ? `${patient.address.street || ""}, ${patient.address.city || ""}, ${patient.address.state || ""}`
                                : "Not provided"}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientContactInfo;