import React from "react";
import { TbArrowBadgeLeft, TbArrowBadgeRight } from "react-icons/tb";
const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };
  return (
    <nav className="absolute lg:left-[35%] sm:left-[30%] xs:left-[20%]">
      <ul className="btn-group flex justify-center my-4">
        <li
          className="btn text-2xl"
          onClick={() => handlePageChange(currentPage - 1)} // function for previous page
          disabled={currentPage === 1}
        >
          <TbArrowBadgeLeft />
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`btn${currentPage === pageNumber ? " btn-active " : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        <li
          className="btn text-2xl"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <TbArrowBadgeRight />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
