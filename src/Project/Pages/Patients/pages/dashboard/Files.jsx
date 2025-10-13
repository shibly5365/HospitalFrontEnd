import React from "react";

export default function Files({ files, isVisible }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-700 delay-600 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Files</h2>
      <ul className="divide-y divide-gray-200">
        {files.map((file) => (
          <li
            key={file.id}
            className="py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 transition-all"
          >
            <div>
              <p className="font-medium text-gray-700">{file.name}</p>
              <p className="text-sm text-gray-500">
                {file.size} • {file.date}
              </p>
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
