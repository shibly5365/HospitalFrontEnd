import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PaymentsTab = ({ doctor, payments, onSalaryUpdate }) => {
  const monthlyEarnings = [
    { month: "Sep", amount: doctor.salary || 0 },
    { month: "Oct", amount: doctor.salary || 0 },
    { month: "Nov", amount: doctor.salary || 0 },
    { month: "Dec", amount: doctor.salary || 0 },
    { month: "Jan", amount: doctor.salary || 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500">Monthly Salary</p>
          <p className="text-2xl font-bold text-gray-900">
            ${doctor.salary?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500">Paid Amount (YTD)</p>
          <p className="text-2xl font-bold text-green-600">
            ${((doctor.salary || 0) * 7).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <p className="text-2xl font-bold text-orange-600">
            ${(doctor.salary || 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Salary Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment History
        </h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="px-6 py-4">{payment.month}</td>
                  <td className="px-6 py-4">
                    ${payment.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No payment history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <button
            onClick={() => {
              const newSalary = prompt(
                "Enter new salary amount:",
                doctor.salary
              );
              if (newSalary) onSalaryUpdate(parseInt(newSalary));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Salary
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;