// components/PrescriptionAnalytics.jsx
import React from 'react';
import { FileText } from 'lucide-react';

const PrescriptionAnalytics = ({ timeframe, prescriptionData }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={24} className="text-green-600" />
                Prescription Analytics
            </h2>
            <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Total Prescriptions</div>
                <div className="text-3xl font-bold text-green-600">{prescriptionData[timeframe].total}</div>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Prescribed Medicines</h3>
                <div className="space-y-2">
                    {prescriptionData.topMedicines.slice(0, 5).map((medicine, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{medicine.name}</span>
                            <span className="font-semibold text-gray-800">{medicine.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrescriptionAnalytics;