import React from "react";
import { Calendar, DollarSign, FileText, ChevronRight, CheckCircle, Clock, XCircle, Stethoscope } from "lucide-react";

const PatientHistory = ({ doctor }) => {
    console.log(doctor);

    const formatDate = (date) => !date ? "N/A" : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);

    const doctorAppointments = [
        { id: 1, date: "2024-01-15", type: "Regular Checkup", status: "completed", diagnosis: "Routine physical examination", prescription: "Lisinopril 10mg", notes: "Patient advised to reduce sodium intake", amount: 150, duration: "30 mins", followUpRequired: true, followUpDate: "2024-04-15" },
        { id: 2, date: "2023-12-10", type: "Follow-up", status: "completed", diagnosis: "Hypertension monitoring", prescription: "Continued Lisinopril 10mg", amount: 120, duration: "20 mins", followUpRequired: false },
        { id: 3, date: "2023-09-05", type: "Initial Consultation", status: "completed", diagnosis: "Stage 1 Hypertension", prescription: "Lisinopril 5mg", amount: 200, duration: "45 mins", followUpRequired: true, followUpDate: "2023-12-10" }
    ];

    const doctorPayments = [
        { id: 1, date: "2024-01-16", description: "Regular Checkup", amount: 150, status: "paid", method: "Credit Card" },
        { id: 2, date: "2023-12-11", description: "Follow-up Consultation", amount: 120, status: "paid", method: "Insurance" },
        { id: 3, date: "2023-09-06", description: "Initial Consultation", amount: 200, status: "paid", method: "Credit Card" }
    ];

    const getStatusBadge = (status) => {
        const config = {
            completed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
            scheduled: { color: "bg-blue-100 text-blue-700", icon: Clock },
            cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
            paid: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
            pending: { color: "bg-amber-100 text-amber-700", icon: Clock }
        }[status] || { color: "bg-amber-100 text-amber-700", icon: Clock };

        const IconComponent = config.icon;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${config.color}`}>
                <IconComponent size={12} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const totalRevenue = doctorPayments.reduce((total, payment) => total + payment.amount, 0);
    const lastVisit = doctorAppointments[0];

    return (
        <div className="space-y-6">
            {/* Doctor-Patient Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><Stethoscope size={20} className="text-blue-600" /></div>
                        <div><h3 className="text-lg font-bold text-slate-900">Patient Overview</h3><p className="text-sm text-slate-600">Treatment history with {doctor?.name || "you"}</p></div>
                    </div>
                    <div className="text-right"><p className="text-xs text-slate-600">Total Visits</p><p className="text-lg font-bold text-slate-900">{doctorAppointments.length}</p></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-xs text-slate-600 mb-1">Last Visit</p><p className="text-sm font-semibold text-slate-900">{formatDate(lastVisit?.date)}</p></div>
                    <div><p className="text-xs text-slate-600 mb-1">Next Follow-up</p><p className="text-sm font-semibold text-slate-900">{formatDate(doctorAppointments.find(apt => apt.followUpRequired)?.followUpDate) || "Not scheduled"}</p></div>
                    <div><p className="text-xs text-slate-600 mb-1">Total Revenue</p><p className="text-sm font-semibold text-slate-900">{formatCurrency(totalRevenue)}</p></div>
                </div>
            </div>

            {/* Treatment History */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 rounded-lg"><Calendar size={20} className="text-indigo-600" /></div>
                        <div><h3 className="text-lg font-bold text-slate-900">Treatment History</h3><p className="text-xs text-slate-600">Appointments with {doctor?.name || "you"}</p></div>
                    </div>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">View All<ChevronRight size={16} /></button>
                </div>
                <div className="space-y-4">
                    {doctorAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm"><Calendar size={16} className="text-indigo-600" /></div>
                                    <div><p className="text-sm font-semibold text-slate-900">{appointment.type}</p><p className="text-xs text-slate-600">{formatDate(appointment.date)} • {appointment.duration}</p></div>
                                </div>
                                {getStatusBadge(appointment.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                <div><p className="text-xs text-slate-600">Diagnosis</p><p className="font-semibold text-slate-900">{appointment.diagnosis}</p></div>
                                <div><p className="text-xs text-slate-600">Prescription</p><p className="font-semibold text-slate-900">{appointment.prescription}</p></div>
                            </div>
                            {appointment.notes && <div className="mb-3"><p className="text-xs text-slate-600">Clinical Notes</p><p className="text-sm text-slate-900">{appointment.notes}</p></div>}
                            {appointment.followUpRequired && <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                <div><p className="text-xs text-slate-600">Follow-up Required</p><p className="text-sm font-semibold text-slate-900">{formatDate(appointment.followUpDate)}</p></div>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Scheduled</span>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial History */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-50 rounded-lg"><DollarSign size={20} className="text-green-600" /></div>
                        <div><h3 className="text-lg font-bold text-slate-900">Financial History</h3><p className="text-xs text-slate-600">Payments for your services</p></div>
                    </div>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">View All<ChevronRight size={16} /></button>
                </div>
                <div className="space-y-3">
                    {doctorPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm"><DollarSign size={16} className="text-green-600" /></div>
                                <div><p className="text-sm font-semibold text-slate-900">{payment.description}</p><p className="text-xs text-slate-600">{formatDate(payment.date)} • {payment.method}</p></div>
                            </div>
                            <div className="text-right"><p className="text-sm font-bold text-slate-900">{formatCurrency(payment.amount)}</p>{getStatusBadge(payment.status)}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div><p className="text-xs text-slate-600 mb-1">Total Revenue</p><p className="text-lg font-bold text-slate-900">{formatCurrency(totalRevenue)}</p></div>
                        <div><p className="text-xs text-slate-600 mb-1">Avg. per Visit</p><p className="text-lg font-bold text-slate-900">{formatCurrency(doctorAppointments.length > 0 ? totalRevenue / doctorAppointments.length : 0)}</p></div>
                        <div><p className="text-xs text-slate-600 mb-1">Last Payment</p><p className="text-lg font-bold text-slate-900">{formatDate(doctorPayments[0]?.date)}</p></div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-left">
                        <div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><Calendar size={16} className="text-blue-600" /></div>
                            <div><p className="text-sm font-semibold text-slate-900">Schedule Follow-up</p><p className="text-xs text-slate-600">Book next appointment</p></div></div>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors text-left">
                        <div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><FileText size={16} className="text-green-600" /></div>
                            <div><p className="text-sm font-semibold text-slate-900">Add Clinical Notes</p><p className="text-xs text-slate-600">Update patient record</p></div></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientHistory;