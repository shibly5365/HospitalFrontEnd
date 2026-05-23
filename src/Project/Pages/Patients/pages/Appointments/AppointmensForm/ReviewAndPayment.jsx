import React from "react";
import {
  CreditCard,
  Wallet,
  Landmark,
  Banknote,
  ShieldCheck,
} from "lucide-react";

const ReviewAndPayment = ({ formData, onInputChange }) => {
  let consultationFee = formData.consultationFee || 0;

  // ✅ Online extra charge
  if (formData.consultationType?.toLowerCase() === "online") {
    consultationFee += 300;
  }

  // ✅ Payment Method UI
  const paymentMethods = [
    {
      label: "UPI",
      value: "UPI",
      icon: Wallet,
    },
    {
      label: "Card",
      value: "Card",
      icon: CreditCard,
    },
    {
      label: "Cash",
      value: "Cash",
      icon: Banknote,
    },
    {
      label: "NetBanking",
      value: "NetBanking",
      icon: Landmark,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Review & Payment</h2>

        <p className="text-gray-500 mt-1">Verify your appointment details</p>
      </div>

      {/* Appointment Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg text-gray-800">
          Appointment Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor</span>

            <span className="font-semibold">
              {formData.doctorName || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>

            <span className="font-semibold">
              {formData.appointmentDate} • {formData.timeSlot?.start} -
              {formData.timeSlot?.end}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Type</span>

            <span className="font-semibold capitalize">
              {formData.consultationType || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Patient Name</span>

            <span className="font-semibold">
              {formData.patientName || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Contact</span>

            <span className="font-semibold">{formData.phone || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Payment Method
        </label>

        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;

            const active = formData.paymentMethod === method.value;

            return (
              <button
                key={method.value}
                type="button"
                onClick={() => onInputChange("paymentMethod", method.value)}
                className={`border rounded-2xl p-4 flex items-center gap-3 transition-all ${
                  active
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    active ? "text-blue-600" : "text-gray-500"
                  }`}
                />

                <span
                  className={`font-medium ${
                    active ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  {method.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Demo Payment Notice */}
      {formData.paymentMethod && formData.paymentMethod !== "Cash" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
          <ShieldCheck className="text-yellow-600 mt-1 w-5 h-5" />

          <div>
            <p className="font-semibold text-yellow-700">Demo Payment Mode</p>

            <p className="text-sm text-yellow-600">
              This is a demo payment flow. No real money will be charged.
            </p>
          </div>
        </div>
      )}

      {/* Cash Notice */}
      {formData.paymentMethod === "Cash" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-700">Cash Payment Selected</p>

          <p className="text-sm text-green-600 mt-1">
            You can pay directly at the hospital reception during your visit.
          </p>
        </div>
      )}

      {/* Fee Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Consultation Fee</span>

          <span className="font-medium">₹{formData.consultationFee || 0}</span>
        </div>

        {formData.consultationType?.toLowerCase() === "online" && (
          <div className="flex justify-between">
            <span className="text-gray-600">Online Consultation Charge</span>

            <span className="font-medium">₹300</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="text-lg font-bold">Total Amount</span>

          <span className="text-2xl font-bold text-blue-600">
            ₹{consultationFee}
          </span>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input type="checkbox" id="confirm" className="mt-1" />

        <label htmlFor="confirm" className="text-sm text-gray-600">
          I confirm that all information provided is accurate and I agree to the
          hospital terms and conditions.
        </label>
      </div>
    </div>
  );
};

export default ReviewAndPayment;
