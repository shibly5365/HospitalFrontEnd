import React from "react";

const TimeConfiguration = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  timeOptions,
  onTimePresetApplied,
}) => {
  const applyTimePreset = (preset) => {
    switch (preset) {
      case "morning":
        setStartTime("08:00");
        setEndTime("12:00");
        break;
      case "afternoon":
        setStartTime("13:00");
        setEndTime("17:00");
        break;
      case "evening":
        setStartTime("17:00");
        setEndTime("21:00");
        break;
      case "fullDay":
        setStartTime("09:00");
        setEndTime("18:00");
        break;
      default:
        break;
    }
    // Auto-generate slots after applying preset
    setTimeout(onTimePresetApplied, 100);
  };

  return (
    <>
      {/* TIME SELECTORS */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* START TIME */}
        <div>
          <label
            className="
          block
          text-sm font-medium
          text-[var(--text)]
          mb-2
        "
          >
            Start Time
          </label>

          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* END TIME */}
        <div>
          <label
            className="
          block
          text-sm font-medium
          text-[var(--text)]
          mb-2
        "
          >
            End Time
          </label>

          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QUICK PRESETS */}
      <div>
        <label
          className="
        block
        text-sm font-medium
        text-[var(--text)]
        mb-2
      "
        >
          Quick Presets
        </label>

        <div className="flex flex-wrap gap-2">
          {[
            {
              id: "morning",
              label: "🌅 Morning (8AM-12PM)",
            },

            {
              id: "afternoon",
              label: "☀️ Afternoon (1PM-5PM)",
            },

            {
              id: "evening",
              label: "🌙 Evening (5PM-9PM)",
            },

            {
              id: "fullDay",
              label: "📅 Full Day (9AM-6PM)",
            },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyTimePreset(preset.id)}
              className="
              px-3 py-2
              text-sm
              rounded-xl
              transition-all

              bg-[var(--surface-soft)]
              text-[var(--text)]
              border border-[var(--line)]

              hover:border-[var(--brand)]
              hover:text-[var(--brand)]
            "
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeConfiguration;
