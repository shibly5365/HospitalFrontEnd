import React from "react";

const PersonalDetailsForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      {/* Header */}
      <div className="bg-green-600 text-white rounded-t-lg -mx-8 -mt-8 p-4 font-semibold">
        Personal Details
      </div>

      {/* Form */}
      <form className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date of Birth *</label>
            <input
              type="text"
              defaultValue="07-07-66678"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender *</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Street Address *</label>
          <input
            type="text"
            defaultValue="Thodupadam"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City *</label>
            <input
              type="text"
              defaultValue="Kozhikode"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State *</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Alaska</option>
              <option>California</option>
              <option>Kerala</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">ZIP / Postal Code *</label>
          <input
            type="text"
            defaultValue="673631"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

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

export default PersonalDetailsForm;
