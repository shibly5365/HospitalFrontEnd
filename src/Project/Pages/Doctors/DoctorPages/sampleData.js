// data/sampleData.js
export const consultationData = {
    daily: { value: 12, trend: 12 },
    weekly: { value: 67, trend: 8 },
    monthly: { value: 284, trend: 15 }
};

export const earningsData = {
    daily: { total: 1520, pending: 107, successful: 1413, trend: 8 },
    weekly: { total: 9120, pending: 640, successful: 8480, trend: 12 },
    monthly: { total: 45600, pending: 3200, successful: 42400, trend: 18 },
    byMethod: [
        { name: 'Card', value: 25440, color: '#3b82f6' },
        { name: 'Cash', value: 10560, color: '#10b981' },
        { name: 'Insurance', value: 6400, color: '#f59e0b' }
    ]
};

export const patientStats = {
    daily: { total: 28, returning: 18, new: 10, trend: 15 },
    weekly: { total: 142, returning: 87, new: 55, trend: 12 },
    monthly: { total: 856, returning: 524, new: 332, trend: 18 },
    ageDistribution: [
        { age: '0-18', count: 142 },
        { age: '19-35', count: 256 },
        { age: '36-50', count: 298 },
        { age: '51-65', count: 112 },
        { age: '65+', count: 48 }
    ],
    genderDistribution: [
        { name: 'Male', value: 412, color: '#3b82f6' },
        { name: 'Female', value: 398, color: '#ec4899' },
        { name: 'Other', value: 46, color: '#8b5cf6' }
    ]
};

export const workingDays = {
    total: 22,
    upcoming: 8,
    holidays: 2,
    leaves: 3
};

export const consultationInsights = {
    daily: { avgDuration: '15 min', satisfaction: 4.6 },
    weekly: { avgDuration: '17 min', satisfaction: 4.7 },
    monthly: { avgDuration: '18 min', satisfaction: 4.7 }
};

export const chatAnalytics = {
    daily: { total: 15, avgResponse: '2.8 min', satisfaction: 4.5 },
    weekly: { total: 89, avgResponse: '3.1 min', satisfaction: 4.6 },
    monthly: { total: 453, avgResponse: '3.2 min', satisfaction: 4.6 }
};

export const prescriptionData = {
    daily: { total: 9, trend: 8 },
    weekly: { total: 45, trend: 12 },
    monthly: { total: 267, trend: 15 },
    topMedicines: [
        { name: 'Paracetamol', count: 89 },
        { name: 'Amoxicillin', count: 67 },
        { name: 'Metformin', count: 45 },
        { name: 'Lisinopril', count: 38 },
        { name: 'Omeprazole', count: 28 }
    ],
    trend: [
        { month: 'Jul', daily: 1.7, weekly: 8.5, monthly: 52 },
        { month: 'Aug', daily: 2.0, weekly: 10.1, monthly: 61 },
        { month: 'Sep', daily: 2.3, weekly: 11.3, monthly: 68 },
        { month: 'Oct', daily: 1.9, weekly: 9.7, monthly: 58 },
        { month: 'Nov', daily: 2.2, weekly: 11.2, monthly: 67 }
    ]
};

export const appointmentInsights = {
    daily: { online: 5, offline: 4, missed: 0.4, cancelled: 0.6 },
    weekly: { online: 26, offline: 21, missed: 2, cancelled: 3 },
    monthly: { online: 156, offline: 128, missed: 12, cancelled: 18 },
    bookingTrend: [
        { day: 'Mon', daily: 6, weekly: 42, monthly: 42 },
        { day: 'Tue', daily: 5.4, weekly: 38, monthly: 38 },
        { day: 'Wed', daily: 6.4, weekly: 45, monthly: 45 },
        { day: 'Thu', daily: 7.4, weekly: 52, monthly: 52 },
        { day: 'Fri', daily: 6.9, weekly: 48, monthly: 48 },
        { day: 'Sat', daily: 5.0, weekly: 35, monthly: 35 },
        { day: 'Sun', daily: 3.4, weekly: 24, monthly: 24 }
    ]
};

export const diseasesData = {
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