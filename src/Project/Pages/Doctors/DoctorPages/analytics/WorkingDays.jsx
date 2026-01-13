// components/WorkingDays.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

const WorkingDays = ({ workingDays }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-blue-600" />
                Working Days
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Total Days</span>
                    <span className="text-xl font-bold text-blue-600">{workingDays.total}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Upcoming Shifts</span>
                    <span className="text-xl font-bold text-green-600">{workingDays.upcoming}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">Holidays</span>
                    <span className="text-xl font-bold text-yellow-600">{workingDays.holidays}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700">Leaves Taken</span>
                    <span className="text-xl font-bold text-red-600">{workingDays.leaves}</span>
                </div>
            </div>
        </div>
    );
};

export default WorkingDays;