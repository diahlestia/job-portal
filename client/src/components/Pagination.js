import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`border rounded px-4 py-2 mr-2 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <span className="mx-2 text-lg">Page {currentPage}</span> 
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="border rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

