import React from "react";
import "./pagination.css";

const Pagination = ({
  slotsPerPage,
  totalSlots,
  currentPage,
  increase,
  decrease,
  first,
  last,
}) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(totalSlots / slotsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination_container">
      <p className="shift" onClick={first}>
        First
      </p>
      <button
        onClick={() => decrease()}
        className={currentPage === 1 ? "disable" : "active"}
      >
        <i className="fas fa-less-than"></i>
      </button>
      <p>{currentPage}</p>
      <button
        onClick={() => increase()}
        className={currentPage > pageNumbers.length ? "disable" : "active"}
      >
        <i className="fas fa-greater-than"></i>
      </button>
      <p className="shift" onClick={last}>
        Last
      </p>
    </div>
  );
};

export default Pagination;
