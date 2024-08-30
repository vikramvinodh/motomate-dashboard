import React, { useState } from 'react';

function usePagination(data, itemsPerPage) {
  if (!data || (!Array.isArray(data) && typeof data !== 'object') || !itemsPerPage || itemsPerPage <= 0) {
    throw new Error('Invalid data or itemsPerPage value');
  }

  const [currentPage, setCurrentPage] = useState(1);

  // Ensure data is an array or convert a single item to an array
  const dataArray = Array.isArray(data) ? data : [data];

  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  const currentData = dataArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    currentPage,
    currentData,
    nextPage,
    prevPage,
    totalPages,
  };
}

export default usePagination;
