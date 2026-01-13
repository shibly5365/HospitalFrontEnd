import { notify } from "../../../../../../Units/notification";


export const exportToCSV = (payments, activeTab) => {
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