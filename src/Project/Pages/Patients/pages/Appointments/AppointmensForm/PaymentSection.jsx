// PaymentSection.jsx
import React, { useState } from "react";

const PaymentSection = ({ formData, setFormData }) => {
  const [showGPayDemo, setShowGPayDemo] = useState(false);
  const [demoProcessing, setDemoProcessing] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // When user toggles Online/Offline
  const handleConsultationChange = (e) => {
    const value = e.target.value;
    // reset paymentMethod when changing consultation type
    setFormData((prev) => ({
      ...prev,
      consultationType: value,
      paymentMethod: "",       // clear previous selection
      paymentCompleted: false, // reset completion flag
    }));
    setShowGPayDemo(false);
    setDemoProcessing(false);
    setDemoSuccess(false);
  };

  // When user chooses a payment method radio
  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    // Only allowed strings: "UPI","Card","Cash","NetBanking"
    setFormData((prev) => ({ ...prev, paymentMethod: value }));

    // If UPI (online), open demo GPay modal instead of direct redirect
    if (value === "UPI" && formData.consultationType === "Online") {
      setShowGPayDemo(true);
    } else {
      setShowGPayDemo(false);
      // for offline methods, we'll treat payment as pending until actual payment happens in clinic
      setFormData((prev) => ({ ...prev, paymentCompleted: false }));
      setDemoSuccess(false);
    }
  };

  // Simulate a Google Pay payment flow (demo)
  const simulateGPayPayment = async () => {
    setDemoProcessing(true);
    setDemoSuccess(false);

    // Fake delay to simulate network/payment processing
    await new Promise((r) => setTimeout(r, 1400));

    // mark demo success
    setDemoProcessing(false);
    setDemoSuccess(true);

    // mark in formData that payment was completed
    setFormData((prev) => ({
      ...prev,
      paymentMethod: "UPI",          // must match backend enum
      paymentCompleted: true,        // custom flag used locally
      paymentChannel: "Online",      // optional: channel
      paymentAmount: prev.paymentAmount || 500, // optional
    }));
  };

  // Close demo modal and keep paymentCompleted flag
  const closeGPayDemo = () => {
    setShowGPayDemo(false);
  };

  // available payment options based on consultation type
  const paymentOptions =
    formData.consultationType === "Online" ? ["UPI"] : ["Card", "Cash", "NetBanking"];

  return (
    <div className="col-span-2 border p-4 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">Consultation & Payment</h3>

      {/* Consultation Type */}
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="consultationType"
            value="Online"
            checked={formData.consultationType === "Online"}
            onChange={handleConsultationChange}
            className="accent-blue-500"
          />
          Online
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="consultationType"
            value="Offline"
            checked={formData.consultationType === "Offline"}
            onChange={handleConsultationChange}
            className="accent-green-500"
          />
          Offline
        </label>
      </div>

      {/* Payment options */}
      {formData.consultationType && (
        <div className="p-3 border rounded-md bg-gray-50 mb-3">
          <p className="text-sm text-gray-700 mb-2">Select payment method</p>
          <div className="flex gap-4">
            {paymentOptions.map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handlePaymentMethodChange}
                  className="accent-blue-500"
                />
                {method}
              </label>
            ))}
          </div>

          {/* show contextual messages */}
          <div className="mt-3">
            {formData.consultationType === "Online" && formData.paymentMethod === "UPI" && (
              <p className="text-sm text-gray-700">UPI selected — demo GPay will open.</p>
            )}

            {formData.consultationType === "Offline" &&
              ["Card", "Cash", "NetBanking"].includes(formData.paymentMethod) && (
                <p className="text-sm text-green-700">
                  {formData.paymentMethod} selected — mark payment as{" "}
                  <strong>Pending</strong> until collected at clinic.
                </p>
              )}

            {formData.paymentCompleted && (
              <p className="text-sm text-green-600 mt-2">
                Payment completed (demo). Payment method: {formData.paymentMethod}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Demo GPay Modal (simple inline modal) */}
      {showGPayDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => closeGPayDemo()}
          />
          <div className="bg-white rounded-lg p-6 z-60 w-[90%] max-w-md shadow-lg">
            <h4 className="text-lg font-semibold mb-3">Google Pay — Demo</h4>

            {/* show simulated qr / details */}
            <div className="border rounded p-4 mb-4">
              <p className="text-sm">Pay to: clinic@oksbi</p>
              <p className="text-sm">Amount: ₹{formData.paymentAmount || 500}</p>
              <p className="text-sm">Reference: Consultation Fee</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  closeGPayDemo();
                }}
                className="px-4 py-2 rounded border"
                disabled={demoProcessing}
              >
                Cancel
              </button>

              <button
                onClick={simulateGPayPayment}
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={demoProcessing || demoSuccess}
              >
                {demoProcessing ? "Processing..." : demoSuccess ? "Paid" : "Pay with GPay (Demo)"}
              </button>
            </div>

            {demoSuccess && (
              <div className="mt-3 text-sm text-green-600">Demo payment successful 🎉</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
