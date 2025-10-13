import React from "react";
import { CheckCircle } from "lucide-react";

const Complete = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-10">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Appointment Confirmed!</h2>
      <p className="text-gray-600 text-center mb-6">
        Your appointment has been successfully booked.  
        You will receive a confirmation SMS shortly.
      </p>
      <button
        onClick={() => window.location.href = "/receptionist/receptionist-dashboard"}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Complete;
