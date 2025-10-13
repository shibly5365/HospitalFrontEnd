import React from "react";

const AdvancedInfoForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      {/* Header */}
      <div className="bg-green-600 text-white rounded-t-lg -mx-8 -mt-8 p-4 font-semibold">
        Advanced Information
      </div>

      <form className="space-y-6 mt-6">
        {/* Profile Picture */}
        <div>
          <label className="block font-medium text-gray-700">
            Profile Picture (Optional)
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">👤</span>
            </div>
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-green-600 border-green-600 hover:bg-green-50"
            >
              Upload Photo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Upload a clear photo of yourself. This helps our staff identify you during visits.
          </p>
        </div>

        <hr />

        {/* Emergency Contact */}
        <div>
          <label className="block font-medium text-gray-700">
            Emergency Contact (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Enter emergency contact name"
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="(555) 123-4567"
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <hr />

        {/* Medical History */}
        <div>
          <label className="block font-medium text-gray-700">
            Medical History & Notes (Optional)
          </label>
          <textarea
            placeholder="Please share any relevant medical history, current medications, allergies, or other important health information..."
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            rows="4"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">
            This information helps our medical staff provide better care. You can always update this later in your patient portal.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            ← Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Continue →
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedInfoForm;
