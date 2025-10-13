import React from "react";

const Payments = () => {
  const earnings = [
    { label: "Total Earnings", value: "$1200" },
    { label: "Pending Payments", value: "$300" },
    { label: "Completed Payments", value: "$900" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Payments / Earnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {earnings.map((e) => (
          <div key={e.label} className="p-4 rounded shadow bg-green-50">
            <p className="text-gray-500">{e.label}</p>
            <p className="text-xl font-bold">{e.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
