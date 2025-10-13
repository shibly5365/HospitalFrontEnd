import React from "react";

const steps = [
  "Patient Type",
  "Department",
  "Doctor",
  "Time Slot",
  "Details",
  "Confirm",
  "Complete",
];

const ProgressBar = ({ currentStep, onReset }) => {
  return (
    <div className="w-full bg-white shadow-md p-4 mb-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Patient Registration</h2>
          <p className="text-gray-500 text-sm">
            Follow the 7-step process to register a new patient
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Reset Form
        </button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={step} className="flex-1 flex items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold
                  ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : isCompleted
                      ? "bg-teal-400 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {stepNumber}
              </div>

              {/* Step Label */}
              <div className="ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                {step}
              </div>

              {/* Line between steps */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 
                    ${isCompleted ? "bg-teal-400" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
