import React, { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "../../../../../Units/notification";

// Components
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Loader from "./components/Loader";
import Stats from "./components/Stats";
import Charts from "./components/Charts";
import Filters from "../appoint/Filters";
import PaymentsTable from "./components/PaymentsTable";

export default function BillingManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    completedAmount: 0,
    todayRevenue: 0,
    totalTransactions: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, [activeTab, dateFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      let endpoint = "http://localhost:4002/api/receptionist/payments";
      
      if (activeTab === "pending") {
        endpoint = "http://localhost:4002/api/receptionist/payments/pending";
      } else if (activeTab === "completed") {
        endpoint = "http://localhost:4002/api/receptionist/payments/completed";
      }

      const res = await axios.get(endpoint, { 
        params: { dateRange: dateFilter },
        withCredentials: true 
      });

      if (res.data.success && res.data.data) {
        const data = res.data.data;
        setPayments(data.payments || []);
        
        // Enhanced summary calculation
        const paymentsData = data.payments || [];
        const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);
        const pendingAmount = paymentsData
          .filter(p => p.status === "Pending")
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        const completedAmount = paymentsData
          .filter(p => p.status === "Completed" || p.status === "Paid")
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        
        setSummary({
          totalRevenue,
          pendingAmount,
          completedAmount,
          todayRevenue: data.todayRevenue || 0,
          totalTransactions: paymentsData.length
        });
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      notify.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const csvData = payments.map(p => ({
      "Patient Name": p.patient?.fullName || "Unknown",
      "Amount": p.amount,
      "Payment Method": p.method,
      "Status": p.status,
      "Date": new Date(p.createdAt).toLocaleDateString(),
      "Transaction ID": p.transactionId || p._id
    }));

    const headers = Object.keys(csvData[0] || {});
    const csv = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => 
        `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    notify.success("Data exported successfully");
  };

  const filteredPayments = payments.filter(payment =>
    payment.patient?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.patient?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Header onExport={handleExportData} />
        
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {loading ? (
          <Loader />
        ) : (
          <>
            <Stats summary={summary} />
            
            <Charts />
            
            <Filters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
            />
            
            <PaymentsTable 
              payments={filteredPayments}
              allPayments={payments}
              onRefresh={fetchPayments}
            />
          </>
        )}
      </div>
    </div>
  );
}