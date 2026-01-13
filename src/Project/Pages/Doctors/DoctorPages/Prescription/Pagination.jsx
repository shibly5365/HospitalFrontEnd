import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, filteredPrescriptions, itemsPerPage }) => {
  if (filteredPrescriptions.length <= itemsPerPage) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
      <button
        onClick={() => onPageChange(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">
          Page <span className="font-bold text-blue-600">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
        </span>
      </div>
      
      <button
        onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;