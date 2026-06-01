import React from "react";
import { Settings } from "lucide-react";

const SlotSettings = ({
  slotDuration,
  setSlotDuration,
  breakDuration,
  setBreakDuration,
  breakTime,
  setBreakTime,
  timeOptions,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* SLOT DURATION */}
      <div>
        <label
          className="
        block
        text-sm font-medium
        text-[var(--text)]
        mb-2
      "
        >
          <Settings
            size={16}
            className="
            inline mr-1
            text-[var(--brand)]
          "
          />
          Slot Duration
        </label>

        <select
          value={slotDuration}
          onChange={(e) => setSlotDuration(Number(e.target.value))}
          className="
          w-full
          p-3
          border border-[var(--line)]
          rounded-xl
          bg-[var(--surface)]
          text-[var(--text)]
          outline-none
          focus:ring-2 focus:ring-[var(--brand)]
        "
        >
          <option value={15}>15 minutes</option>

          <option value={20}>20 minutes</option>

          <option value={30}>30 minutes</option>

          <option value={45}>45 minutes</option>

          <option value={60}>60 minutes</option>
        </select>
      </div>

      {/* BREAK DURATION */}
      <div>
        <label
          className="
        block
        text-sm font-medium
        text-[var(--text)]
        mb-2
      "
        >
          Break Duration
        </label>

        <select
          value={breakDuration}
          onChange={(e) => setBreakDuration(Number(e.target.value))}
          className="
          w-full
          p-3
          border border-[var(--line)]
          rounded-xl
          bg-[var(--surface)]
          text-[var(--text)]
          outline-none
          focus:ring-2 focus:ring-[var(--brand)]
        "
        >
          <option value={0}>No break</option>

          <option value={15}>15 minutes</option>

          <option value={30}>30 minutes</option>

          <option value={45}>45 minutes</option>

          <option value={60}>60 minutes</option>
        </select>
      </div>

      {/* BREAK TIME */}
      {breakDuration > 0 && (
        <div className="md:col-span-2">
          <label
            className="
          block
          text-sm font-medium
          text-[var(--text)]
          mb-2
        "
          >
            Break Start Time
          </label>

          <select
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
            className="
            w-full
            p-3
            border border-[var(--line)]
            rounded-xl
            bg-[var(--surface)]
            text-[var(--text)]
            outline-none
            focus:ring-2 focus:ring-[var(--brand)]
          "
          >
            <option value="">Select break time</option>

            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SlotSettings;
