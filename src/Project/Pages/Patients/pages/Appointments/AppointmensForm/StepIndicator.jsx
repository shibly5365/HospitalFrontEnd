import React from 'react';

const StepIndicator = ({ step }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
            step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {num}
          </div>
          {num < 3 && (
            <div className={`w-20 h-1 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;