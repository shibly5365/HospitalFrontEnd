import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const PatientInformation = ({ formData, onInputChange, calculateAge }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold theme-text mb-6">Patient Information</h2>

      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">
          <User className="inline w-4 h-4 mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          value={formData.patientName}
          onChange={(e) => onInputChange('patientName', e.target.value)}
          placeholder="Enter full name"
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium theme-text-muted mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => onInputChange('dob', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium theme-text-muted mb-2">Age</label>
          <input
            type="text"
            value={calculateAge(formData.dob)}
            readOnly
            placeholder="Auto-calculated"
            className="w-full px-4 py-3 theme-soft theme-text rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium theme-text-muted mb-2">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => onInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium theme-text-muted mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium theme-text-muted mb-2">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium theme-text-muted mb-2">
          <MapPin className="inline w-4 h-4 mr-1" />
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Street, City, State, ZIP"
          className="w-full px-4 py-3 theme-card theme-text rounded-lg"
          rows="3"
        />
      </div>

      <details className="theme-card rounded-lg p-4">
        <summary className="cursor-pointer font-medium theme-text-muted">Optional Details</summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium theme-text-muted mb-2">Emergency Contact</label>
            <input
              type="tel"
              value={formData.emergencyContact}
              onChange={(e) => onInputChange('emergencyContact', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 theme-card theme-text rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium theme-text-muted mb-2">Insurance Details</label>
            <input
              type="text"
              value={formData.insurance}
              onChange={(e) => onInputChange('insurance', e.target.value)}
              placeholder="Insurance provider and policy number"
              className="w-full px-4 py-3 theme-card theme-text rounded-lg"
            />
          </div>
        </div>
      </details>
    </div>
  );
};

export default PatientInformation;