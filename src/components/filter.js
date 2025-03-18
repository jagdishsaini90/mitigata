"use client";

import { SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  resetState,
  setSearchText,
  setStatus,
  handleClearFilters,
  setUpdateDateRange,
} from "@/redux/usersSlice";
import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters() {
  const { search, status, startDate, endDate } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
    dispatch(resetState());

    dispatch(
      fetchUsers({
        page: 1,
        offset: 0,
        search: value,
        status,
        startDate,
        endDate,
      })
    );
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    dispatch(setStatus(value));
    dispatch(resetState());

    dispatch(
      fetchUsers({
        page: 1,
        offset: 0,
        search,
        status: value,
        startDate,
        endDate,
      })
    );
  };

  const handleClear = () => {
    dispatch(handleClearFilters());
    dispatch(
      fetchUsers({
        page: 1,
        offset: 0,
        search: "",
        status: "",
        startDate: "",
        endDate: "",
      })
    );
  };

  const handleDateRangeChange = (update) => {
    dispatch(setUpdateDateRange(update));
    if (update[0] && update[1]) {
      dispatch(resetState());
      dispatch(
        fetchUsers({
          page: 1,
          offset: 0,
          search,
          status,
          startDate: update[0],
          endDate: update[1],
        })
      );
    } else if (!update[0] && !update[1]) {
      dispatch(resetState());
      dispatch(
        fetchUsers({
          page: 1,
          offset: 0,
          search,
          status,
          startDate: null,
          endDate: null,
        })
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 w-full">
      <div className="w-full sm:w-[350px]">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={search}
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            className="pl-10 w-full pr-4 py-2 border border-[#B9B9B9] rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
        <select
          className="w-full sm:w-auto border-2 border-[#B9B9B9] rounded-[5px] py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>

        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateRangeChange}
          isClearable
          placeholderText="Select Date Range"
          dateFormat="dd MMM yyyy"
          className="w-full sm:w-auto border border-[#B9B9B9] rounded-md py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleClear}
          className="flex items-center gap-2 border border-[#B9B9B9] px-4 py-2 text-sm sm:text-base rounded-[5px] text-gray-700 hover:bg-gray-100 transition"
        >
          <FaFilter className="text-gray-500" />
          Clear Filters
        </button>
      </div>
    </div>
  );
}
