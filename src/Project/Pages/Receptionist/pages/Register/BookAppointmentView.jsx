import React, { useState } from 'react';
import { Calendar, Search, User, CheckCircle } from 'lucide-react';

export default function BookAppointmentView({ onBack, patients, onBookAppointment, showSuccess }) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newAppointment, setNewAppointment] = useState({
        date: '', time: '', doctor: '', reason: ''
    });

    const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    const handleSubmit = () => {
        if (!newAppointment.date || !newAppointment.time || !newAppointment.doctor || !newAppointment.reason) {
            alert('Please fill all required fields');
            return;
        }
        const appointment = {
            id: Date.now(),
            patient: selectedPatient,
            ...newAppointment
        };
        onBookAppointment(appointment);
        setNewAppointment({ date: '', time: '', doctor: '', reason: '' });
        setSelectedPatient(null);
    };

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery)
    );

    if (showSuccess) {
        return (
            <div className="max-w-3xl mx-auto">
                <BackButton onBack={onBack} />
                <SuccessState
                    title="Appointment Booked Successfully!"
                    message="Redirecting to dashboard..."
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <BackButton onBack={onBack} />

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-purple-100 p-3 rounded-xl">
                        <Calendar className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                        <p className="text-gray-500">Schedule appointment for existing patient</p>
                    </div>
                </div>

                {!selectedPatient ? (
                    <PatientSelection
                        patients={filteredPatients}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onPatientSelect={setSelectedPatient}
                    />
                ) : (
                    <AppointmentForm
                        selectedPatient={selectedPatient}
                        onPatientChange={() => setSelectedPatient(null)}
                        appointment={newAppointment}
                        onAppointmentChange={setNewAppointment}
                        doctors={doctors}
                        timeSlots={timeSlots}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
}

function BackButton({ onBack }) {
    return (
        <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
        >
            <span>←</span>
            <span>Back to Dashboard</span>
        </button>
    );
}

function SuccessState({ title, message }) {
    return (
        <div className="text-center py-12">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{message}</p>
        </div>
    );
}

function PatientSelection({ patients, searchQuery, onSearchChange, onPatientSelect }) {
    return (
        <div>
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search Patient</label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Search by name or phone number"
                    />
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {patients.map(patient => (
                    <div
                        key={patient.id}
                        onClick={() => onPatientSelect(patient)}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-all"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                                <p className="text-sm text-gray-500">{patient.phone}</p>
                            </div>
                        </div>
                        <span className="text-purple-600 font-medium">Select →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AppointmentForm({ selectedPatient, onPatientChange, appointment, onAppointmentChange, doctors, timeSlots, onSubmit }) {
    return (
        <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{selectedPatient.name}</h4>
                        <p className="text-sm text-gray-600">{selectedPatient.phone}</p>
                    </div>
                </div>
                <button
                    onClick={onPatientChange}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                    Change
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Date *</label>
                    <input
                        type="date"
                        value={appointment.date}
                        onChange={(e) => onAppointmentChange({ ...appointment, date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot *</label>
                    <select
                        value={appointment.time}
                        onChange={(e) => onAppointmentChange({ ...appointment, time: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                        <option value="">Select time</option>
                        {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Doctor *</label>
                <select
                    value={appointment.doctor}
                    onChange={(e) => onAppointmentChange({ ...appointment, doctor: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                    <option value="">Choose a doctor</option>
                    {doctors.map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Visit *</label>
                <textarea
                    value={appointment.reason}
                    onChange={(e) => onAppointmentChange({ ...appointment, reason: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    rows="3"
                    placeholder="Brief description of symptoms or reason for appointment"
                />
            </div>

            <button
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                Book Appointment
            </button>
        </div>
    );
}