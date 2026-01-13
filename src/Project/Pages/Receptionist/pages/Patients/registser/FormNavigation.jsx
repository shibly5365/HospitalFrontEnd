import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function FormNavigation({ activeSection, sections, onSectionChange, loading, isLastSection }) {
  const navigate = useNavigate();
  const currentIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
      <button
        type="button"
        onClick={() => currentIndex > 0 && onSectionChange(sections[currentIndex - 1].id)}
        disabled={currentIndex === 0}
        className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate("/receptionist/patients/view-search")}
          className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition duration-200"
        >
          Cancel
        </button>

        {isLastSection ? (
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Registering...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Complete Registration
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => currentIndex < sections.length - 1 && onSectionChange(sections[currentIndex + 1].id)}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition duration-200 shadow-md hover:shadow-lg"
          >
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}