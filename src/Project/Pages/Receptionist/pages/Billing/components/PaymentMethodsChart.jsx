import React from "react";
import { CreditCard } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const paymentMethodsData = [
  { name: 'Credit Card', value: 45, color: '#4F46E5' },
  { name: 'Debit Card', value: 25, color: '#06B6D4' },
  { name: 'UPI', value: 15, color: '#10B981' },
  { name: 'Cash', value: 10, color: '#F59E0B' },
  { name: 'Insurance', value: 5, color: '#EF4444' }
];

export default function PaymentMethodsChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
          <p className="text-gray-600 text-sm">Distribution by payment type</p>
        </div>
        <CreditCard className="text-purple-600" size={24} />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={paymentMethodsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {paymentMethodsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Share"]}
              contentStyle={{ borderRadius: '8px', border: 'none' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}