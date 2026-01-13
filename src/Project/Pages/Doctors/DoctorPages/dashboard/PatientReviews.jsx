import React from "react";

const PatientReviews = () => {
  const reviews = [
    { rating: "Excellent", percentage: 65 },
    { rating: "Great", percentage: 25 },
    { rating: "Good", percentage: 10 },
    { rating: "Average", percentage: 5 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Patients Review</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{review.rating}</span>
            <span className="text-sm font-semibold text-gray-800">{review.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReviews;