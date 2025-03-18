"use client";

import Button from "@/components/button";
import UserStatsCard from "@/components/card";
import Filters from "@/components/filter";
import Loader from "@/components/loader";
import Pagination from "@/components/pagination";
import DataTable from "@/components/table";
import { useScrollBottom } from "@/hooks/useScrollBottom";
import { fetchUsers, setHasMore, setOffset } from "@/redux/usersSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersDetails = () => {
  const isBottom = useScrollBottom();
  const dispatch = useDispatch();
  const {
    loading,
    users,
    currentPage,
    offset,
    search,
    status,
    hasMore,
    startDate,
    endDate,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, offset: 0, search: "", status: "" }));
    dispatch(setOffset(5));
  }, []);

  useEffect(() => {
    if (isBottom && !loading && hasMore) {
      const loadMore = async () => {
        if (loading) return;
        dispatch(
          fetchUsers({
            page: currentPage,
            offset,
            search,
            status,
            startDate,
            endDate,
          })
        );
        dispatch(setHasMore(false));
        dispatch(setOffset(0));
      };
      loadMore();
    }
  }, [isBottom]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#222222]">User Records</h2>
          <p className="text-[#B9B9B9]">
            Information about a user, including name, email, start date,
            Inviter, status and available actions.
          </p>
        </div>
        <Button>Download Report</Button>
      </div>

      <UserStatsCard />
      <Filters />

      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <>
          <DataTable />
          <Pagination />
        </>
      ) : (
        <div className="text-center text-gray-500 py-10 text-lg">
          No users to show.
        </div>
      )}
    </div>
  );
};

export default UsersDetails;
