import React from "react";
import { Clock } from "lucide-react";

const GeneratedSlotsPreview = ({ generatedSlots, slotDuration }) => {
  const getTotalSlotsTime = () => {
    if (!generatedSlots.length) return 0;
    const totalMinutes = generatedSlots.length * slotDuration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  };

  if (generatedSlots.length === 0) return null;

  return (
    <div
      className="
    border-t border-[var(--line)]
    pt-4
  "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className="
        font-medium
        text-[var(--text)]
        flex items-center gap-2
      "
        >
          <Clock size={18} className="text-[var(--brand)]" />
          Generated Slots ({generatedSlots.length} slots, {getTotalSlotsTime()})
        </h3>

        <span
          className="
        text-sm
        text-green-700
        dark:text-green-400

        bg-green-100
        dark:bg-green-500/20

        px-2 py-1
        rounded-lg
      "
        >
          Available
        </span>
      </div>

      {/* SLOTS */}
      <div
        className="
      grid grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-2

      max-h-60
      overflow-y-auto
      p-2
    "
      >
        {generatedSlots.map((slot, i) => (
          <div
            key={i}
            className="
            p-2
            rounded-lg
            text-center
            text-sm

            bg-[var(--surface-soft)]
            border border-[var(--line)]

            text-[var(--text)]

            hover:border-[var(--brand)]
            transition
          "
          >
            {slot.start} - {slot.end}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedSlotsPreview;
