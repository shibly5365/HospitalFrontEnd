// components/StatCard.jsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, subtitle, color, trend, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    {Icon && <Icon size={18} />}
                    <span className="font-medium">{title}</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
                {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
    </div>
);

export default StatCard;