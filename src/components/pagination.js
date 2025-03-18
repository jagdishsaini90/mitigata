import { fetchUsers, setCurrentPage } from "@/redux/usersSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const { currentPage, totalPages, search, status } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const updateUsers = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setCurrentPage(page));
    dispatch(fetchUsers({ page, offset: 0, search, status }));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateUsers(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updateUsers(currentPage + 1);
    }
  };

  const handlePageChange = (event) => {
    const selectedPage = Number(event.target.value);
    updateUsers(selectedPage);
  };

  return (
    <div className="flex items-center justify-center gap-2 py-6 my-4">
      <button
        onClick={() => updateUsers(1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50"
      >
        «
      </button>

      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50"
      >
        ‹
      </button>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">Page</span>
        <select
          value={currentPage}
          onChange={handlePageChange}
          className="border rounded-md px-3 py-1 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <option key={page} value={page}>
                {page}
              </option>
            )
          )}
        </select>
        <span className="text-gray-600">of {totalPages}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50"
      >
        ›
      </button>

      <button
        onClick={() => updateUsers(totalPages)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
