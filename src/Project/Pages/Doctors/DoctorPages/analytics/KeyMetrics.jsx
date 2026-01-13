// components/KeyMetrics.jsx
import React from 'react';
import { Activity, Users, DollarSign, Award } from 'lucide-react';
import StatCard from './StatCard';

const KeyMetrics = ({ timeframe, consultationData, earningsData, patientStats, consultationInsights }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
                icon={Activity}
                title="Total Consultations"
                value={consultationData[timeframe].value}
                subtitle={`${timeframe} overview`}
                color="#3b82f6"
                trend={consultationData[timeframe].trend}
            />
            <StatCard
                icon={DollarSign}
                title="Total Earnings"
                value={`$${earningsData[timeframe].total.toLocaleString()}`}
                subtitle={`$${earningsData[timeframe].pending.toLocaleString()} pending`}
                color="#10b981"
                trend={earningsData[timeframe].trend}
            />
            <StatCard
                icon={Users}
                title="Total Patients"
                value={patientStats[timeframe].total}
                subtitle={`${patientStats[timeframe].new} new patients`}
                color="#f59e0b"
                trend={patientStats[timeframe].trend}
            />
            <StatCard
                icon={Award}
                title="Satisfaction Rating"
                value={consultationInsights[timeframe].satisfaction}
                subtitle="Out of 5.0"
                color="#ec4899"
                trend={5}
            />
        </div>
    );
};

export default KeyMetrics;