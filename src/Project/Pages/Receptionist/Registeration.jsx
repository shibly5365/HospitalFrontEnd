import React, { useState } from 'react';
import Header from './pages/Register/Header';
import DashboardView from './pages/Register/DashboardView';
import RegisterPatientView from './pages/Register/RegisterPatientView';
import BookAppointmentView from './pages/Register/BookAppointmentView';


export default function ReceptionRegistration() {
    const [activeView, setActiveView] = useState('home');
    const [patients, setPatients] = useState([
        { id: 1, name: 'John Smith', phone: '555-0101', email: 'john@email.com' },
        { id: 2, name: 'Sarah Johnson', phone: '555-0102', email: 'sarah@email.com' },
        { id: 3, name: 'Mike Wilson', phone: '555-0103', email: 'mike@email.com' }
    ]);
    const [appointments, setAppointments] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRegisterPatient = (newPatient) => {
        const patient = { id: Date.now(), ...newPatient };
        setPatients([...patients, patient]);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setActiveView('home');
        }, 2000);
    };

    const handleBookAppointment = (appointment) => {
        setAppointments([...appointments, appointment]);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setActiveView('home');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {activeView === 'home' && (
                    <DashboardView
                        appointments={appointments}
                        onViewChange={setActiveView}
                    />
                )}

                {activeView === 'register' && (
                    <RegisterPatientView
                        onBack={() => setActiveView('home')}
                        onRegister={handleRegisterPatient}
                        showSuccess={showSuccess}
                    />
                )}

                {activeView === 'book' && (
                    <BookAppointmentView
                        onBack={() => setActiveView('home')}
                        patients={patients}
                        onBookAppointment={handleBookAppointment}
                        showSuccess={showSuccess}
                    />
                )}
            </div>
        </div>
    );
}