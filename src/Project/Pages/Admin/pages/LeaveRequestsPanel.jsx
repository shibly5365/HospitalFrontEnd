import { apiClient } from "../../../../services/queryClient";
import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const LeaveRequestsPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reasonText, setReasonText] = useState("");

  // Fetch leave requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "/admin/leave-requests",
          { withCredentials: true },
        );
        console.log("faaaa", response.data);

        setRequests(response.data.requests || mockLeaveRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests(mockLeaveRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await apiClient.post(
        `/admin/leave-requests/${requestId}/approve`,
        {},
        { withCredentials: true },
      );
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "approved" } : r,
        ),
      );
      toast.success("Leave request approved");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await apiClient.post(
        `/admin/leave-requests/${requestId}/reject`,
        { reason: reasonText },
        { withCredentials: true },
      );
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "rejected" } : r,
        ),
      );
      toast.success("Leave request rejected");
      setShowModal(false);
      setReasonText("");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  console.log("req", requests);

  const pendingRequests = requests.filter((r) => r.status === "pending");

  const otherRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Leave Requests</h2>
        <p className="text-sm text-gray-500 mt-1">
          {pendingRequests.length} pending • {otherRequests.length} processed
        </p>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-100 p-4">
          <p className="text-sm font-semibold text-yellow-900 mb-3">
            Pending Requests ({pendingRequests.length})
          </p>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg p-4 border border-yellow-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {request.staffName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {request.staffName}
                      </p>
                      <p className="text-sm text-gray-600">{request.role}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                      request.status,
                    )}`}
                  >
                    {getStatusIcon(request.status)}
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">To</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.leaveType}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Reason:</span>{" "}
                  {request.reason}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(request.id);
                      setShowModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Requests */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No leave requests</div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.staffName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {request.startDate} - {request.endDate}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                    request.status,
                  )}`}
                >
                  {getStatusIcon(request.status)}
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Reject Leave Request
            </h3>
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="Provide a reason for rejection (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4"
              rows="4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setReasonText("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedRequest)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data
const mockLeaveRequests = [
  {
    id: 1,
    staffName: "Dr. John Smith",
    role: "Doctor",
    startDate: "2024-05-10",
    endDate: "2024-05-15",
    leaveType: "Vacation",
    reason: "Family vacation",
    status: "pending",
  },
  {
    id: 2,
    staffName: "Nurse Sarah",
    role: "Nurse",
    startDate: "2024-05-08",
    endDate: "2024-05-09",
    leaveType: "Medical",
    reason: "Doctor appointment",
    status: "approved",
  },
  {
    id: 3,
    staffName: "Dr. Mike Brown",
    role: "Doctor",
    startDate: "2024-05-20",
    endDate: "2024-05-22",
    leaveType: "Personal",
    reason: "Personal emergency",
    status: "pending",
  },
];

export default LeaveRequestsPanel;
