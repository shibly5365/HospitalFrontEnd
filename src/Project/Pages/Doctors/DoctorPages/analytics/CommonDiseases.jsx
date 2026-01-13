// components/CommonDiseases.jsx
import React from 'react';
import { Briefcase, Clock, Award } from 'lucide-react';

const CommonDiseases = ({ timeframe, consultationInsights }) => {
    const diseasesData = {
        daily: [
            { name: 'Flu/Cold', count: 2.6 },
            { name: 'Hypertension', count: 1.9 },
            { name: 'Diabetes', count: 1.6 },
            { name: 'Arthritis', count: 1.1 },
            { name: 'Allergies', count: 0.9 }
        ],
        weekly: [
            { name: 'Flu/Cold', count: 18 },
            { name: 'Hypertension', count: 13 },
            { name: 'Diabetes', count: 11 },
            { name: 'Arthritis', count: 8 },
            { name: 'Allergies', count: 6 }
        ],
        monthly: [
            { name: 'Flu/Cold', count: 78 },
            { name: 'Hypertension', count: 56 },
            { name: 'Diabetes', count: 48 },
            { name: 'Arthritis', count: 34 },
            { name: 'Allergies', count: 28 }
        ]
    };

    const currentData = diseasesData[timeframe];
    const maxCount = Math.max(...currentData.map(d => d.count));

    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase size={24} className="text-indigo-600" />
                Common Diseases Treated
            </h2>
            <div className="space-y-3">
                {currentData.map((disease, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 font-medium">{disease.name}</span>
                            <span className="text-gray-600">{disease.count} {timeframe === 'daily' ? 'today' : timeframe === 'weekly' ? 'this week' : 'this month'}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${(disease.count / maxCount) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex gap-4">
                <div className="flex-1 bg-purple-50 rounded-lg p-4">
                    <Clock size={20} className="text-purple-600 mb-2" />
                    <div className="text-sm text-gray-600">Avg Duration</div>
                    <div className="text-xl font-bold text-purple-600">{consultationInsights[timeframe].avgDuration}</div>
                </div>
                <div className="flex-1 bg-pink-50 rounded-lg p-4">
                    <Award size={20} className="text-pink-600 mb-2" />
                    <div className="text-sm text-gray-600">Satisfaction</div>
                    <div className="text-xl font-bold text-pink-600">{consultationInsights[timeframe].satisfaction}/5.0</div>
                </div>
            </div>
        </div>
    );
};

export default CommonDiseases;