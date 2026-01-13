// components/PatientDemographics.jsx
import React from 'react';
import { Users } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PatientDemographics = ({ timeframe, patientStats }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={24} className="text-purple-600" />
                Patient Demographics
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Returning Patients</div>
                    <div className="text-2xl font-bold text-indigo-600">{patientStats[timeframe].returning}</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">New Patients</div>
                    <div className="text-2xl font-bold text-pink-600">{patientStats[timeframe].new}</div>
                </div>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={patientStats.genderDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {patientStats.genderDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PatientDemographics;