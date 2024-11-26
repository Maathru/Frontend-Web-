import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 gap-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-200 
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        Previous
      </button>

      {/* Pagination Numbers */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 
              ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-200 
          ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
