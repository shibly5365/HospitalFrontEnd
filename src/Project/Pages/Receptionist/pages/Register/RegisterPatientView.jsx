import React, { useState } from 'react';
import { UserPlus, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function RegisterPatientView({ onBack, onRegister, showSuccess }) {
  const [newPatient, setNewPatient] = useState({
    name: '', phone: '', email: '', address: '', dob: ''
  });

  const handleSubmit = () => {
    if (!newPatient.name || !newPatient.phone || !newPatient.email || !newPatient.address || !newPatient.dob) {
      alert('Please fill all required fields');
      return;
    }
    onRegister(newPatient);
    setNewPatient({ name: '', phone: '', email: '', address: '', dob: '' });
  };

  if (showSuccess) {
    return (
      <div className="max-w-3xl mx-auto">
        <BackButton onBack={onBack} />
        <SuccessState 
          title="Patient Registered Successfully!"
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
          <div className="bg-blue-100 p-3 rounded-xl">
            <UserPlus className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Register New Patient</h2>
            <p className="text-gray-500">Fill in patient details below</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Full Name *"
              icon={User}
              type="text"
              value={newPatient.name}
              onChange={(value) => setNewPatient({...newPatient, name: value})}
              placeholder="Enter full name"
            />

            <FormField
              label="Date of Birth *"
              type="date"
              value={newPatient.dob}
              onChange={(value) => setNewPatient({...newPatient, dob: value})}
            />

            <FormField
              label="Phone Number *"
              icon={Phone}
              type="tel"
              value={newPatient.phone}
              onChange={(value) => setNewPatient({...newPatient, phone: value})}
              placeholder="555-0123"
            />

            <FormField
              label="Email Address *"
              icon={Mail}
              type="email"
              value={newPatient.email}
              onChange={(value) => setNewPatient({...newPatient, email: value})}
              placeholder="patient@email.com"
            />
          </div>

          <FormField
            label="Address *"
            icon={MapPin}
            type="textarea"
            value={newPatient.address}
            onChange={(value) => setNewPatient({...newPatient, address: value})}
            placeholder="Enter complete address"
            rows="3"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Register Patient
          </button>
        </div>
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

function FormField({ label, icon: Icon, type = 'text', value, onChange, placeholder, rows }) {
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} ${Icon ? 'pl-11' : ''} resize-none`}
            rows={rows}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} ${Icon ? 'pl-11' : ''}`}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}