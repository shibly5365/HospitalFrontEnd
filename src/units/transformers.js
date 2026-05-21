/**
 * Data Transformation Utilities
 * Centralized functions to transform API responses into UI-friendly formats
 */

/**
 * Transform receptionist appointment data
 */
export const transformReceptionistAppointment = (apt) => ({
  _id: apt._id,
  doctor: apt.doctor,
  patient: apt.patient,
  patientInfo: {
    patientId: apt.patient?.patientId || apt.patient?._id,
    fullName: apt.patient?.fullName || 'Unknown',
    profileImage: apt.patient?.profileImage || '',
    phone: apt.patient?.contact || '',
    email: apt.patient?.email || '',
  },
  doctorInfo: {
    fullName: apt.doctor?.userId?.fullName
      ? `Dr. ${apt.doctor.userId.fullName}`
      : 'Unknown Doctor',
    department: apt.doctor?.department?.name || 'Unknown',
  },
  appointmentDate: apt.appointmentDate,
  timeSlot: apt.timeSlot || { start: '', end: '' },
  status: apt.status,
  reason: apt.reason || 'General Consultation',
  tokenNumber: apt.tokenNumber,
});

export const transformReceptionistAppointments = (appointments) =>
  appointments.map(transformReceptionistAppointment);

/**
 * Transform doctor appointment data
 */
export const transformDoctorAppointment = (apt) => ({
  _id: apt._id,
  patient: {
    fullName: apt.patient?.fullName || 'Unknown',
    age: apt.patient?.age,
    gender: apt.patient?.gender,
    phone: apt.patient?.contact,
    avatar: apt.patient?.fullName
      ? apt.patient.fullName.split(' ').map((w) => w[0]).join('')
      : 'P',
  },
  reason: apt.reason,
  timeSlot: apt.timeSlot,
  status: apt.status,
  consultationType: apt.consultationType,
  date: apt.appointmentDate,
  notes: apt.notes || '',
  isUrgent: false,
});

export const transformDoctorAppointments = (appointments) =>
  appointments.map(transformDoctorAppointment);

/**
 * Transform admin appointment data
 */
export const transformAdminAppointment = (apt) => ({
  _id: apt._id,
  patientName: apt.patient?.fullName || 'Unknown',
  doctorName: apt.doctor?.userId?.fullName
    ? `Dr. ${apt.doctor.userId.fullName}`
    : 'Unknown',
  department: apt.doctor?.department?.name || 'Unknown',
  date: apt.appointmentDate,
  time: apt.timeSlot?.start || '',
  status: apt.status,
  type: apt.consultationType || 'In-Person',
});

export const transformAdminAppointments = (appointments) =>
  appointments.map(transformAdminAppointment);

/**
 * Transform patient data
 */
export const transformPatient = (patient) => ({
  _id: patient._id,
  patientId: patient.patientId,
  fullName: patient.fullName,
  email: patient.email,
  phone: patient.contact,
  age: patient.age,
  gender: patient.gender,
  bloodGroup: patient.bloodGroup,
  address: patient.address,
  profileImage: patient.profileImage,
  createdAt: patient.createdAt,
});

export const transformPatients = (patients) => patients.map(transformPatient);

/**
 * Transform doctor data
 */
export const transformDoctor = (doctor) => ({
  _id: doctor._id,
  fullName: doctor.userId?.fullName || 'Unknown',
  email: doctor.userId?.email || '',
  phone: doctor.userId?.contact || '',
  department: doctor.department?.name || 'Unknown',
  departmentId: doctor.department?._id,
  specialization: doctor.specialization,
  experience: doctor.experience,
  qualification: doctor.qualification,
  profileImage: doctor.userId?.profileImage,
  consultationFee: doctor.consultationFee,
  isAvailable: doctor.isAvailable,
});

export const transformDoctors = (doctors) => doctors.map(transformDoctor);

/**
 * Calculate appointment statistics
 */
export const calculateAppointmentStats = (appointments) => ({
  total: appointments.length,
  confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
  pending: appointments.filter((a) => a.status === 'Pending').length,
  completed: appointments.filter((a) => a.status === 'Completed').length,
  cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
  today: appointments.filter(
    (a) => new Date(a.appointmentDate || a.date).toDateString() === new Date().toDateString()
  ).length,
});

/**
 * Format time slot for display
 */
export const formatTimeSlot = (timeSlot) => {
  if (!timeSlot) return 'N/A';
  if (typeof timeSlot === 'string') return timeSlot;
  return `${timeSlot.start || ''} - ${timeSlot.end || ''}`.trim() || 'N/A';
};

/**
 * Format date for display
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A';
  const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric', ...options };
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Get status badge color classes
 */
export const getStatusColor = (status) => {
  const colors = {
    Confirmed: 'bg-green-100 text-green-800 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Completed: 'bg-blue-100 text-blue-800 border-blue-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
    'In Progress': 'bg-purple-100 text-purple-800 border-purple-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Get user initials from name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount || 0);
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(date);
};
