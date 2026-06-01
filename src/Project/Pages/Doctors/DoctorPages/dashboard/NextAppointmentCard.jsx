import React from 'react';
import { Clock, Phone, Mail, Calendar, MessageCircle, Video, PlayCircle, FileText, NotebookPen } from 'lucide-react';

const NextAppointmentCard = () => {
  const nextAppointment = {
    patientName: "Priya Menon",
    patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    appointmentType: "Follow-up Consultation",
    age: 45,
    gender: "Female",
    bloodGroup: "A+",
    contact: "+91 98765 43210",
    email: "priya.menon@email.com",
    symptoms: "Mild chest pain, shortness of breath, and elevated blood pressure (145/90)",
    lastVisit: "12 Apr 2026",
    medicalHistory: "Hypertension (2 years), Seasonal allergies",
    medications: ["Lisinopril 10mg", "Amlodipine 5mg"],
    allergies: "Penicillin",
    upcomingTests: "Lipid Profile, ECG",
  };

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-lg overflow-hidden border border border-[var(--line)]">
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-5 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="relative flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Next Appointment</h2>
            <p className="text-blue-100 text-sm mt-1">Starting in 15 minutes</p>
          </div>
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">Follow-up</span>
        </div>
      </div>
      
      <div className="p-7">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={nextAppointment.patientAvatar} className="w-28 h-28 rounded-2xl object-cover shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/30" alt="" />
          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-2xl font-bold">{nextAppointment.patientName}</h3>
                <p className="text-[var(--muted)] text-sm">{nextAppointment.age} yrs • {nextAppointment.gender} • Blood: {nextAppointment.bloodGroup}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl"><MessageCircle size={18} /></button>
                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl"><Phone size={18} /></button>
                <button className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-xl"><Video size={18} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="flex items-center gap-2"><Clock size={16} className="text-[var(--muted)]" />10:30 AM Today</div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-[var(--muted)]" />{nextAppointment.contact}</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-[var(--muted)]" />{nextAppointment.email}</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-[var(--muted)]" />Last: {nextAppointment.lastVisit}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">🏥 Medical History</p>
            <p className="text-sm text-[var(--muted)]">{nextAppointment.medicalHistory}</p>
            <p className="text-xs text-[var(--muted)] mt-2">Allergies: {nextAppointment.allergies}</p>
          </div>
          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">💊 Current Medications</p>
            <div className="flex flex-wrap gap-2">
              {nextAppointment.medications.map((med, i) => (
                <span key={i} className="text-xs bg-[var(--surface)] px-2 py-1 rounded-lg">{med}</span>
              ))}
            </div>
          </div>
          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">⚠️ Symptoms</p>
            <p className="text-sm text-[var(--muted)]">{nextAppointment.symptoms}</p>
          </div>
          <div className="bg-[var(--surface-soft)] rounded-2xl p-4">
            <p className="font-medium text-sm mb-2">📋 Upcoming Tests</p>
            <p className="text-sm text-[var(--muted)]">{nextAppointment.upcomingTests}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <PlayCircle size={18} /> Start Consultation
          </button>
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <FileText size={18} /> View Full Record
          </button>
          <button className="flex-1 border border-[var(--line)] hover:bg-[var(--surface-soft)] py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <NotebookPen size={18} /> Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextAppointmentCard;