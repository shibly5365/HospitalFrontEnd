

import React, { useState, useMemo } from 'react';
import { 
  Search, Download, Eye, Calendar, CreditCard, 
  MapPin, X 
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';   // ← Import your theme hook

const dummyData = [
  {
    id: "1",
    paymentId: "PAY-20250514-7842",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialization: "Cardiologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    hospitalName: "Medicare Superspeciality Hospital",
    hospitalAddress: "MG Road, Kochi, Kerala 682011",
    appointmentDate: "2025-05-10",
    appointmentTime: "10:30 AM",
    paymentDate: "2025-05-10",
    consultationType: "Offline",
    amount: 1250,
    paymentMethod: "UPI",
    status: "Paid",
    transactionId: "UPI9876543210",
    prescriptionId: "PRX-458291",
    notes: "Regular follow-up for hypertension. BP under control.",
    breakdown: { consultationFee: 1100, serviceCharge: 100, tax: 50 }
  },
  {
    id: "2",
    paymentId: "PAY-20250512-6591",
    doctorName: "Dr. Arjun Menon",
    doctorSpecialization: "Orthopedic Surgeon",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    hospitalName: "Lakeshore Hospital",
    hospitalAddress: "NH Bypass, Kochi, Kerala",
    appointmentDate: "2025-05-08",
    appointmentTime: "03:00 PM",
    paymentDate: "2025-05-08",
    consultationType: "Online",
    amount: 800,
    paymentMethod: "Card",
    status: "Paid",
    transactionId: "CARD-4582-XXXX-9012",
    prescriptionId: "PRX-458292",
    notes: "Knee pain consultation",
    breakdown: { consultationFee: 700, serviceCharge: 70, tax: 30 }
  },
  {
    id: "3",
    paymentId: "PAY-20250505-3321",
    doctorName: "Dr. Ananya Nair",
    doctorSpecialization: "Pediatrician",
    doctorImage: "https://images.unsplash.com/photo-1594824476967-4e9f7c0f0c0e?w=150&h=150&fit=crop",
    hospitalName: "Kerala Medical Center",
    hospitalAddress: "Vyttila, Kochi",
    appointmentDate: "2025-05-05",
    appointmentTime: "11:00 AM",
    paymentDate: "2025-05-05",
    consultationType: "Offline",
    amount: 600,
    paymentMethod: "UPI",
    status: "Pending",
    transactionId: "PENDING-112233",
    prescriptionId: "PRX-458293",
    notes: "Child fever follow-up",
    breakdown: { consultationFee: 550, serviceCharge: 30, tax: 20 }
  },
];

const statusColors = {
  Paid: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  Failed: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

const PatientPaymentHistory = () => {
  const { theme } = useTheme();        // ← Using your theme context

  const [payments] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = 
        payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const lastPayment = payments[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View all your consultation and treatment payments
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mt-4 md:mt-0">
            <Download size={20} />
            Export History
          </button>
        </div>

        {/* Patient Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" 
              alt="Patient" 
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Nuh Ahmed</h2>
              <p className="text-gray-500 dark:text-gray-400">Patient ID: PT-984721</p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Appointments</p>
                <p className="text-3xl font-bold text-indigo-600">{payments.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalSpent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Payment</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{lastPayment?.paymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by doctor or payment ID..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none text-gray-900 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <button className="px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Calendar size={20} />
            Date Filter
          </button>
        </div>

        {/* Payment Table */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Payment ID</th>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Doctor</th>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-5 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-900 dark:text-white">{payment.paymentId}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={payment.doctorImage} 
                          alt="" 
                          className="w-9 h-9 rounded-full object-cover" 
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{payment.doctorName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{payment.doctorSpecialization}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-900 dark:text-white">
                      <div>{payment.paymentDate}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{payment.appointmentTime}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${payment.consultationType === 'Online' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                        {payment.consultationType}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-semibold text-lg text-gray-900 dark:text-white">₹{payment.amount}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-2xl text-sm font-medium border ${statusColors[payment.status]}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                        >
                          <Eye size={20} className="text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors">
                          <Download size={20} className="text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            No payment records found
          </div>
        )}
      </div>

      {/* Payment Details Modal - Improved Dark Mode */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment Details</h3>
                <p className="text-gray-500 dark:text-gray-400">{selectedPayment.paymentId}</p>
              </div>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300"
              >
                <X size={26} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Doctor Info */}
              <div className="flex gap-6 mb-8">
                <img 
                  src={selectedPayment.doctorImage} 
                  alt={selectedPayment.doctorName}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedPayment.doctorName}</h4>
                  <p className="text-indigo-600 dark:text-indigo-500 font-medium">{selectedPayment.doctorSpecialization}</p>
                  <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} />
                    <span>{selectedPayment.hospitalName}</span>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 mb-8">
                <h5 className="font-semibold mb-4 text-gray-900 dark:text-white">Payment Breakdown</h5>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{selectedPayment.breakdown.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span>₹{selectedPayment.breakdown.serviceCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span>₹{selectedPayment.breakdown.tax}</span>
                  </div>
                  <hr className="my-3 border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total Amount</span>
                    <span>₹{selectedPayment.amount}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Appointment</p>
                  <p className="font-medium">{selectedPayment.appointmentDate} • {selectedPayment.appointmentTime}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard size={18} /> {selectedPayment.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium transition">
                Download Invoice
              </button>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="flex-1 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl font-medium text-gray-700 dark:text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPaymentHistory;