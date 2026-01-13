// components/EarningsChart.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EarningsChart = ({ timeframe, earningsData }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={24} className="text-green-600" />
                Earnings Breakdown
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Successful Payments</div>
                    <div className="text-2xl font-bold text-blue-600">${earningsData[timeframe].successful.toLocaleString()}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Pending Payments</div>
                    <div className="text-2xl font-bold text-yellow-600">${earningsData[timeframe].pending.toLocaleString()}</div>
                </div>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={earningsData.byMethod}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {earningsData.byMethod.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningsChart;