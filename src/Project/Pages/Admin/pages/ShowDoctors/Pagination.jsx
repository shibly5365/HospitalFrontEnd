import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
      >
        Previous
      </button>
      <div className="flex gap-1">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-lg text-sm transition-colors ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {pageNum}
          </button>
        ))}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="w-8 h-8 flex items-center justify-center text-gray-400">
              ...
            </span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-600"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;