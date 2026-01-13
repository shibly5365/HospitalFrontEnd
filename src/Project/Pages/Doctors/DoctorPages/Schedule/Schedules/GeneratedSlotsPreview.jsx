import React from "react";
import { Clock } from "lucide-react";

const GeneratedSlotsPreview = ({ generatedSlots, slotDuration }) => {
  const getTotalSlotsTime = () => {
    if (!generatedSlots.length) return 0;
    const totalMinutes = generatedSlots.length * slotDuration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };

  if (generatedSlots.length === 0) return null;

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-700 flex items-center gap-2">
          <Clock size={18} />
          Generated Slots ({generatedSlots.length} slots, {getTotalSlotsTime()})
        </h3>
        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
          Available
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2">
        {generatedSlots.map((slot, i) => (
          <div
            key={i}
            className="p-2 bg-blue-50 border border-blue-200 rounded text-center text-sm text-blue-700"
          >
            {slot.start} - {slot.end}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedSlotsPreview;