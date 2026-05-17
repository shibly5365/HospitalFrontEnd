import React from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaVideo, FaTrash } from "react-icons/fa";
import MultiSelectChips from "./common/MultiSelectChips";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";

const AvailabilityInfo = ({ 
  formData, errors, handleChange, handleDayToggle, 
  handleSlotChange, addSlot, removeSlot 
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCalendarAlt className="text-pink-500" /> Availability & Work Details
      </h2>
      
      <MultiSelectChips
        label="Working Days"
        options={days}
        selected={formData.days}
        onChange={handleDayToggle}
      />
      {errors.days && <p className="text-xs text-red-500 mt-1">{errors.days}</p>}
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Available Time Slots
        </label>
        {formData.slots.map((slot, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="time"
              value={slot.from}
              onChange={(e) => handleSlotChange(index, "from", e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="time"
              value={slot.to}
              onChange={(e) => handleSlotChange(index, "to", e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {formData.slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        {errors[`slot_0`] && <p className="text-xs text-red-500">{errors[`slot_0`]}</p>}
        <button
          type="button"
          onClick={addSlot}
          className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
        >
          + Add Time Slot
        </button>
      </div>
      
      <InputField
        icon={FaMoneyBillWave}
        label="Consultation Fee (₹)"
        name="consultationFee"
        type="number"
        value={formData.consultationFee}
        onChange={handleChange}
        placeholder="Fee per consultation"
      />
      
      <SelectField
        icon={FaVideo}
        label="Consultation Mode"
        name="consultationType"
        value={formData.consultationType}
        onChange={handleChange}
        options={[
          { value: "", label: "Select mode" },
          { value: "online", label: "Online" },
          { value: "offline", label: "In-person" },
        ]}
      />
      
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={formData.status}
            onChange={() => handleChange({ target: { name: "status", value: !formData.status } })}
            className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
          />
          Available for appointments
        </label>
      </div>
    </div>
  );
};

export default AvailabilityInfo;