// components/ViewToggle.jsx
import React from "react";

const ViewToggle = ({ view, onViewChange, appointmentCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="bg-[var(--surface-soft)] rounded-xl p-1 inline-flex">
        <button
          onClick={() => onViewChange("list")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            view === "list"
              ? "bg-[var(--surface)] text-[var(--brand)] shadow-md"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => onViewChange("calendar")}
          className={`px-6 py-2.5 rounded-lg font-medium transition ${
            view === "calendar"
              ? "bg-[var(--surface)] text-[var(--brand)] shadow-md"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          Calendar
        </button>
      </div>
      <p className="text-[var(--muted)] text-sm">
        {appointmentCount} appointment{appointmentCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default ViewToggle;
