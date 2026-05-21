import { apiClient } from "../../../../../../services/queryClient";
import React, { useState } from "react";
import moment from "moment";
import { Plus, RefreshCw, Save } from "lucide-react";
import { generateTimeOptions } from "../Schedules/utils";
import ScheduleTypeSelector from "./ScheduleTypeSelector";
import TimeConfiguration from "./TimeConfiguration";
import SlotSettings from "./SlotSettings";
import GeneratedSlotsPreview from "./GeneratedSlotsPreview";
import { notify } from "../../../../../../units/notification";

const ScheduleCreationPanel = ({ onScheduleCreated, timeOptions }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [slotDuration, setSlotDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(0);
  const [breakTime, setBreakTime] = useState("");
  const [generatedSlots, setGeneratedSlots] = useState([]);
  const [recurringDays, setRecurringDays] = useState([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSelectedDate("");
    setStartTime("09:00");
    setEndTime("17:00");
    setSlotDuration(30);
    setBreakDuration(0);
    setBreakTime("");
    setGeneratedSlots([]);
    setRecurringDays([]);
    setIsRecurring(false);
  };

  const handleGenerateSlots = () => {
    const slots = generateTimeOptions(
      startTime,
      endTime,
      slotDuration,
      breakTime,
      breakDuration
    );
    if (slots) setGeneratedSlots(slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRecurring && !selectedDate)
      return notify.error("Please select a date.");

    if (!generatedSlots.length)
      return notify.error("Generate slots first.");

    try {
      setLoading(true);

      const payload = {
        workingHours: { start: startTime, end: endTime },
        slotDuration,
        onlineFee: 100,
        offlineFee: 80,
        breaks: breakTime
          ? [
              {
                start: breakTime,
                end: moment(breakTime, "HH:mm")
                  .add(breakDuration, "minutes")
                  .format("HH:mm"),
              },
            ]
          : [],
      };

      // Single-day schedule
      if (!isRecurring) {
        payload.selectedDates = [selectedDate];
      }

      // Recurring multi-day schedule
      if (isRecurring) {
        payload.weekDays = recurringDays.map((d) => d.name);
        payload.weeksAhead = 4;
      }

      await apiClient.post(
        "/doctor/createSchedule",
        payload,
        { withCredentials: true }
      );

      notify.success("Schedule saved successfully!");
      resetForm();
      onScheduleCreated();
    } catch (err) {
      notify.error("Failed to save schedule");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Plus size={20} className="text-green-600" /> Create New Schedule
          </h2>

          <button
            onClick={resetForm}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ScheduleTypeSelector
            isRecurring={isRecurring}
            setIsRecurring={setIsRecurring}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            recurringDays={recurringDays}
            setRecurringDays={setRecurringDays}
          />

          <TimeConfiguration
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            timeOptions={timeOptions}
            onTimePresetApplied={handleGenerateSlots}
          />

          <SlotSettings
            slotDuration={slotDuration}
            setSlotDuration={setSlotDuration}
            breakDuration={breakDuration}
            setBreakDuration={setBreakDuration}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            timeOptions={timeOptions}
          />

          <button
            type="button"
            onClick={handleGenerateSlots}
            className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} /> Generate Time Slots
          </button>

          <GeneratedSlotsPreview generatedSlots={generatedSlots} />

          <button
            type="submit"
            disabled={!generatedSlots.length || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCreationPanel;
