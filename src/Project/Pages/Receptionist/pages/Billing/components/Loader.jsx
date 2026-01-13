import React from "react";

export default function Loader() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600 mt-4 text-lg">Loading payments...</p>
    </div>
  );
}