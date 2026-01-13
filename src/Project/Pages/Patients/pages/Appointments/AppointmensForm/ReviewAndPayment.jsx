import React from 'react';
import { CreditCard } from 'lucide-react';

const ReviewAndPayment = ({ formData, onInputChange }) => {
  // Use the consultationFee from formData (comes from doctor.rate)
  let consultationFee = formData.consultationFee || 0;
  console.log("repay", formData.paymentMethod);


  // Optional: adjust fee for online consultation
  if (formData.consultationType?.toLowerCase() === 'online') {
    consultationFee += 300; // adjust if needed
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Payment</h2>

      {/* Appointment Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg text-gray-800">Appointment Summary</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{formData.doctorName || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {formData.appointmentDate} at {formData.timeSlot?.start} - {formData.timeSlot?.end}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Type:</span>
            <span className="font-medium capitalize">{formData.consultationType || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Patient Name:</span>
            <span className="font-medium">{formData.patientName || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contact:</span>
            <span className="font-medium">{formData.phone || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <CreditCard className="inline w-4 h-4 mr-1" />
          Payment Method
        </label>
        <select
          value={formData.paymentMethod}
          onChange={(e) => onInputChange('paymentMethod', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="Cash">Cash (Pay at clinic)</option>
          <option value="NetBanking">NetBanking</option>
        </select>

      </div>

      {/* Consultation Fee */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Consultation Fee:</span>
          <span className="text-2xl font-bold text-blue-600">💲{consultationFee}</span>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="flex items-start gap-2">
        <input type="checkbox" id="confirm" className="mt-1" />
        <label htmlFor="confirm" className="text-sm text-gray-600">
          I confirm that all the information provided is accurate and I agree to the terms and conditions
        </label>
      </div>
    </div>
  );
};

export default ReviewAndPayment;
