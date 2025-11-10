import React from 'react';
import { Calendar, UserPlus, User, Clock ,Icon } from 'lucide-react';

export default function DashboardView({ appointments, onViewChange }) {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ActionCard
            icon={UserPlus}
            title="New Patient"
            description="Register a new patient"
            details="Complete patient registration with personal and contact information"
            color="blue"
            onClick={() => onViewChange('register')}
          />
          <ActionCard
            icon={Calendar}
            title="Book Appointment"
            description="Schedule for existing patient"
            details="Book appointments for registered patients with available doctors"
            color="purple"
            onClick={() => onViewChange('book')}
          />
        </div>
      </div>

      {/* Today's Appointments */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Appointments</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No appointments scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{apt.patient.name}</h4>
                      <p className="text-sm text-gray-500">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{apt.time}</p>
                    <p className="text-sm text-gray-500">{apt.doctor}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, details, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className={`h-2 bg-gradient-to-r from-${color}-500 to-${color}-600`}></div>
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`bg-${color}-100 p-4 rounded-xl group-hover:scale-110 transition-transform`}>
            <Icon className={`w-8 h-8 text-${color}-600`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">{details}</p>
      </div>
    </div>
  );
}