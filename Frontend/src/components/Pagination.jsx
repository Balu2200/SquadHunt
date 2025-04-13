import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePageChange = (pageNum) => {
    onPageChange(pageNum);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePrevPage}
        className="px-3 py-1 mx-1 rounded bg-blue-500 text-white"
        disabled={page === 1}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        className="px-3 py-1 mx-1 rounded bg-blue-500 text-white"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
