import React from "react";
import RevenueChart from "./RevenueChart";
import PaymentMethodsChart from "./PaymentMethodsChart";



export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <RevenueChart />
      <PaymentMethodsChart />
    </div>
  );
}