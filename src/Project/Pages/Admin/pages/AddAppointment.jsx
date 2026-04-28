import React, { useState, useEffect } from "react";

const RescheduleAppointment = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  availableSlots = [],
}) => {
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
    reason: "",
    mode: "Online",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        patientName: initialData.patientName || "",
        date: initialData.appointmentDate
          ? new Date(initialData.appointmentDate).toISOString().split("T")[0]
          : "",
        time: "",
        reason: "",
        mode: initialData.mode || "Online",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit?.({ ...form, id: initialData?._id });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* 🔥 Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            Reschedule Appointment
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Patient */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <p className="text-xs text-gray-400 mb-1">PATIENT</p>
              <h3 className="font-semibold text-lg">
                {initialData?.patientName}
              </h3>
              <p className="text-sm text-gray-500">{initialData?.email}</p>
              <p className="text-sm text-gray-500">{initialData?.phone}</p>
            </div>

            {/* Doctor */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <p className="text-xs text-gray-400 mb-1">DOCTOR</p>
              <h3 className="font-semibold text-lg">
                {initialData?.doctorName}
              </h3>
              <p className="text-sm text-gray-500">
                {initialData?.departmentName}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Select Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value, time: "" })
                }
                className="w-full mt-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Slots */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Available Time Slots
              </label>

              <div className="flex flex-wrap gap-2 mt-3">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm({ ...form, time: slot })}
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                        form.time === slot
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No slots available</p>
                )}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Consultation Mode
              </label>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {["Online", "Offline"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForm({ ...form, mode })}
                    className={`py-3 rounded-xl border transition ${
                      form.mode === mode
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Reason
              </label>
              <textarea
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                rows={3}
                className="w-full mt-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Explain reason..."
              />
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white pt-4 flex justify-end gap-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !form.time}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
              >
                {loading ? "Saving..." : "Confirm Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
