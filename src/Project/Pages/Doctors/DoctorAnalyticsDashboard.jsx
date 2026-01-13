// DoctorAnalyticsDashboard.jsx
import React, { useState } from 'react';

import {
    consultationData,
    earningsData,
    patientStats,
    workingDays,
    consultationInsights,
    chatAnalytics,
    prescriptionData,
    appointmentInsights,
    diseasesData
} from './DoctorPages/sampleData';
import Header from './DoctorPages/analytics/Header';
import KeyMetrics from './DoctorPages/analytics/KeyMetrics';
import EarningsChart from './DoctorPages/analytics/EarningsChart';
import PatientDemographics from './DoctorPages/analytics/PatientDemographics';
import WorkingDays from './DoctorPages/analytics/WorkingDays';
import CommonDiseases from './DoctorPages/analytics/CommonDiseases';
import CommunicationAnalytics from './DoctorPages/analytics/CommunicationAnalytics';
import PrescriptionAnalytics from './DoctorPages/analytics/PrescriptionAnalytics';
import AppointmentTrends from './DoctorPages/analytics/AppointmentTrends';

const DoctorAnalyticsDashboard = () => {
    const [timeframe, setTimeframe] = useState('monthly');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                <Header timeframe={timeframe} setTimeframe={setTimeframe} />

                <KeyMetrics
                    timeframe={timeframe}
                    consultationData={consultationData}
                    earningsData={earningsData}
                    patientStats={patientStats}
                    consultationInsights={consultationInsights}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <EarningsChart timeframe={timeframe} earningsData={earningsData} />
                    <PatientDemographics timeframe={timeframe} patientStats={patientStats} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <WorkingDays workingDays={workingDays} />
                    <CommonDiseases
                        timeframe={timeframe}
                        consultationInsights={consultationInsights}
                        diseasesData={diseasesData}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <CommunicationAnalytics
                        timeframe={timeframe}
                        chatAnalytics={chatAnalytics}
                        appointmentInsights={appointmentInsights}
                    />
                    <PrescriptionAnalytics
                        timeframe={timeframe}
                        prescriptionData={prescriptionData}
                    />
                </div>

                <AppointmentTrends
                    timeframe={timeframe}
                    appointmentInsights={appointmentInsights}
                    patientStats={patientStats}
                    prescriptionData={prescriptionData}
                />
            </div>
        </div>
    );
};

export default DoctorAnalyticsDashboard;