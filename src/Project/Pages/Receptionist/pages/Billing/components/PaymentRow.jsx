import { apiClient } from "../../../../../../services/queryClient";
import React from "react";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Printer, 
  MoreVertical 
} from "lucide-react";
import { notify } from "../../../../../../units/notification";

export default function PaymentRow({ payment, onRefresh }) {
  const handleMarkAsPaid = async () => {
    try {
      await apiClient.put(
        `/receptionist/payments/${payment._id}/status`,
        { status: "Paid" },
        { withCredentials: true }
      );
      notify.success("Payment marked as paid");
      onRefresh();
    } catch (err) {
      notify.error("Failed to update payment status");
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      const response = await apiClient.post(
        `/receptionist/payments/${payment._id}/invoice`,
        {},
        { responseType: 'blob', withCredentials: true }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${payment._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      notify.success("Invoice downloaded successfully");
    } catch (err) {
      notify.error("Failed to generate invoice");
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Paid":
      case "Completed":
        return <CheckCircle size={12} />;
      case "Pending":
        return <Clock size={12} />;
      default:
        return <XCircle size={12} />;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "Paid":
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-red-100 text-red-700 border border-red-200";
    }
  };

  return (
    <tr className="hover:bg-blue-50/30 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-blue-600">
              {payment.patient?.fullName?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{payment.patient?.fullName || "Unknown"}</p>
            <p className="text-sm text-gray-500">{payment.patient?.email || payment.patient?.phone || "No contact"}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <code className="text-sm bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
          {payment.transactionId || payment._id.slice(-8)}
        </code>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-bold text-gray-900 text-lg">₹{payment.amount?.toLocaleString() || 0}</p>
          {payment.discount && (
            <p className="text-sm text-green-600">-₹{payment.discount} discount</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-gray-400" />
          <span className="font-medium">{payment.method || "N/A"}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusClass(payment.status)}`}>
            {getStatusIcon(payment.status)}
            {payment.status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          {new Date(payment.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {payment.status === "Pending" && (
            <button
              onClick={handleMarkAsPaid}
              className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Mark Paid
            </button>
          )}
          <button
            onClick={handleGenerateInvoice}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Generate Invoice"
          >
            <Printer size={18} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}