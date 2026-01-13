// components/AppointmentTrends.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AppointmentTrends = ({ timeframe, appointmentInsights, patientStats, prescriptionData }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-orange-600" />
                Appointment Trends
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{appointmentInsights[timeframe].online}</div>
                    <div className="text-sm text-gray-600">Online</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{appointmentInsights[timeframe].offline}</div>
                    <div className="text-sm text-gray-600">Offline</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">{appointmentInsights[timeframe].cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">{appointmentInsights[timeframe].missed}</div>
                    <div className="text-sm text-gray-600">Missed</div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Patient Age Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={patientStats.ageDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8b5cf6" name="Patients" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Prescription Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={prescriptionData.trend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey={timeframe}
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name={`Prescriptions (${timeframe})`}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentTrends;