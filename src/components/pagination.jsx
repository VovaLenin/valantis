import React, { useState, useEffect } from "react";

function Pagination({ totalPageCount, currentPage, onPageChange }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    generatePages();
  }, [totalPageCount, currentPage]);

  const generatePages = () => {
    const maxPagesToShow = 5; // Максимальное количество отображаемых страниц
    const pagesToShow = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPageCount, startPage + maxPagesToShow - 1);

    if (totalPageCount > maxPagesToShow) {
      if (endPage === totalPageCount) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      } else if (startPage === 1) {
        endPage = Math.min(totalPageCount, startPage + maxPagesToShow - 1);
      }
    }

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPageCount) {
      if (endPage < totalPageCount - 1) {
        pagesToShow.push("...");
      }
      pagesToShow.push(totalPageCount);
    }

    setPages(pagesToShow);
  };

  const handleClick = (page) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination">
      {pages.map((page, index) => (
        <button
          key={index}
          className={`${page === currentPage ? "active" : ""} ${
            page === "..." ? "ellipsis" : ""
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}

export default Pagination;
