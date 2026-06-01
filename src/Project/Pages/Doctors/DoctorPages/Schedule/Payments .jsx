import React from "react";

const Payments = () => {
  const earnings = [
    { label: "Total Earnings", value: "$1200" },
    { label: "Pending Payments", value: "$300" },
    { label: "Completed Payments", value: "$900" },
  ];

  return (
    <div
      className="
    bg-[var(--surface)]
    border border-[var(--line)]
    p-6
    rounded-2xl
    shadow-sm
  "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2
          className="
        text-2xl font-semibold
        text-[var(--text)]
      "
        >
          Payments / Earnings
        </h2>

        <p
          className="
        text-sm
        text-[var(--muted)]
        mt-1
      "
        >
          Track your payment history and earnings
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {earnings.map((e) => (
          <div
            key={e.label}
            className="
            p-5
            rounded-2xl

            bg-[var(--surface-soft)]
            border border-[var(--line)]

            hover:border-[var(--brand)]
            transition-all
          "
          >
            <p
              className="
            text-sm
            text-[var(--muted)]
            mb-2
          "
            >
              {e.label}
            </p>

            <p
              className="
            text-3xl
            font-bold
            text-[var(--text)]
          "
            >
              {e.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
