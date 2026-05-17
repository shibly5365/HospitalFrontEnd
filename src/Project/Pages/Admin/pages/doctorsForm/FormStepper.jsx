import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const FormStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Personal" },
    { number: 2, label: "Professional" },
    { number: 3, label: "Availability" },
    { number: 4, label: "Additional" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep >= step.number
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step.number ? <FaCheckCircle /> : step.number}
            </div>
            <div className="text-xs mt-2 text-gray-600 hidden sm:block">
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="relative max-w-2xl mx-auto mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-full w-full">
          <div
            className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepper;