import { apiClient } from "../../../../../services/queryClient";
import React, { useEffect, useState } from "react";
import { DollarSign, TrendingUp, CreditCard, Wallet, Download } from "lucide-react";

export const DailyBillingReports = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [transactions, setTransactions] = useState([]);

    // ------------ FETCH BILLING REPORT ------------
    const fetchBillingReport = async () => {
        try {
            const res = await apiClient.get(
                `/receptionist/reports/billing?date=${date}`,
                { withCredentials: true }
            );

            console.log("Billing Response:", res.data);

            // Fix: ensure data is ALWAYS array
            const safeData = Array.isArray(res.data.data) ? res.data.data : [];
            setTransactions(safeData);

        } catch (err) {
            console.log("Billing fetch error:", err);
            setTransactions([]); // prevent UI crash
        }
    };

    useEffect(() => {
        fetchBillingReport();
    }, [date]);

    // ------------ SUMMARY CALCULATIONS ------------
    const summary = {
        totalRevenue: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
        paidAmount: transactions
            .filter((t) => t.status === "Paid")
            .reduce((sum, t) => sum + t.amount, 0),
        pendingAmount: transactions
            .filter((t) => t.status === "Pending")
            .reduce((sum, t) => sum + t.amount, 0),
        transactionCount: transactions.length,
    };

    const paymentMethods = {
        CreditCard: transactions
            .filter((t) => t.payment === "Credit Card")
            .reduce((sum, t) => sum + t.amount, 0),
        Insurance: transactions
            .filter((t) => t.payment === "Insurance")
            .reduce((sum, t) => sum + t.amount, 0),
        Cash: transactions
            .filter((t) => t.payment === "Cash")
            .reduce((sum, t) => sum + t.amount, 0),
    };

    // ------------ EXPORT EXCEL (future-ready) ------------
    const exportExcel = () => {
        console.log("Excel export clicked");
        // TODO: integrate XLSX or server-side export
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <DollarSign className="w-6 h-6" />
                        Daily Billing Reports
                    </h2>
                    <p className="text-gray-600">Financial transactions and revenue overview</p>
                </div>

                {/* DATE PICKER */}
                <div className="flex gap-3">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    />

                    <button
                        onClick={exportExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Excel
                    </button>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div className="text-blue-600 font-bold text-2xl">₹{summary.totalRevenue}</div>
                    </div>
                    <div className="text-gray-600">Total Revenue</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <div className="text-green-600 font-bold text-2xl">₹{summary.paidAmount}</div>
                    </div>
                    <div className="text-gray-600">Paid Amount</div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-yellow-600 font-bold text-2xl">₹{summary.pendingAmount}</div>
                    <div className="text-gray-600">Pending Amount</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-purple-600 font-bold text-2xl">{summary.transactionCount}</div>
                    <div className="text-gray-600">Transactions</div>
                </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-semibold mb-3">Payment Methods</h3>
                    {Object.entries(paymentMethods).map(([method, amount]) => (
                        <div key={method} className="flex justify-between items-center mb-2">
                            <span className="flex items-center gap-2">
                                {method === "CreditCard" ? (
                                    <CreditCard className="w-4 h-4" />
                                ) : method === "Cash" ? (
                                    <Wallet className="w-4 h-4" />
                                ) : (
                                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                )}
                                {method}
                            </span>
                            <span className="font-medium">₹{amount}</span>
                        </div>
                    ))}
                </div>

                {/* RECENT TRANSACTIONS */}
                <div>
                    <h3 className="font-semibold mb-3">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-2 text-left text-sm">Invoice</th>
                                    <th className="p-2 text-left text-sm">Patient</th>
                                    <th className="p-2 text-left text-sm">Amount</th>
                                    <th className="p-2 text-left text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.slice(0, 3).map((t) => (
                                    <tr key={t._id} className="border-b">
                                        <td className="p-2 text-sm">{t.invoice}</td>
                                        <td className="p-2 text-sm">{t.patientName}</td>
                                        <td className="p-2 text-sm font-medium">₹{t.amount}</td>
                                        <td className="p-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${t.status === "Paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* FULL TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Invoice #</th>
                            <th className="p-3 text-left">Patient</th>
                            <th className="p-3 text-left">Service</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Payment Method</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{t.invoice}</td>
                                <td className="p-3">{t.patientName}</td>
                                <td className="p-3">{t.service}</td>
                                <td className="p-3 font-bold">₹{t.amount}</td>
                                <td className="p-3">{t.payment}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${t.status === "Paid"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
