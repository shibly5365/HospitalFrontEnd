import React from "react";

const LeavesTab = ({ leaves, onLeaveAction }) => {
  const pendingLeaves = leaves?.pending || [];
  const historyLeaves = leaves?.history || [];

  return (
    <div className="space-y-6">
      {/* 🔥 PENDING */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Leave Requests</h3>

        {pendingLeaves.length > 0 ? (
          pendingLeaves.map((leave) => (
            <div key={leave._id} className="border rounded-lg p-4 mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium capitalize">{leave.type} Leave</p>

                  <p className="text-sm text-gray-500">
                    {new Date(leave.startDate).toLocaleDateString()} -{" "}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {leave.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onLeaveAction(leave._id, "approved")}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => onLeaveAction(leave._id, "rejected")}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No pending leave requests</p>
        )}
      </div>

      {/* 🔥 HISTORY */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Leave History</h3>

        {historyLeaves.length > 0 ? (
          historyLeaves.map((leave) => (
            <div key={leave._id} className="flex justify-between border-b py-3">
              <div>
                <p className="font-medium capitalize">{leave.type}</p>

                <p className="text-sm text-gray-500">
                  {new Date(leave.startDate).toLocaleDateString()} -{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  leave.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : leave.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {leave.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No leave history</p>
        )}
      </div>
    </div>
  );
};

export default LeavesTab;
