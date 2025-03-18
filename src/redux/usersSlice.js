import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page = 1,
      offset = 0,
      search = "",
      status = "",
      startDate = null,
      endDate = null,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`/api/users`, {
        params: { page, offset, search, status, startDate, endDate },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUsers = createAsyncThunk(
  "users/updateUsers",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

function sortBy(users = [], key, by, order) {
  return [...users].sort((a, b) => {
    const valueA = a[by][key] || "";
    const valueB = b[by][key] || "";

    return order === "asc"
      ? valueA.localeCompare(valueB, undefined, { sensitivity: "base" })
      : valueB.localeCompare(valueA, undefined, { sensitivity: "base" });
  });
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentPage: 1,
    offset: 0,
    loading: false,
    hasMore: true,
    userStats: {
      activeUsers: 0,
      inactiveUsers: 0,
      blockedUsers: 0,
      totalUsers: 0,
    },
    totalPages: 0,
    error: null,
    search: "",
    status: "",
    sortedBy: { key: "name", order: "dsc", by: "about" },
    startDate: null,
    endDate: null,
  },
  reducers: {
    resetState: (state) => {
      state.users = [];
      state.offset = 5;
      state.hasMore = true;
      state.currentPage = 1;
    },
    setSearchText: (state, action) => {
      state.search = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.offset = 5;
      state.users = [];
      state.hasMore = true;
      state.loading = false;
    },
    handleClearFilters: (state) => {
      state.offset = 5;
      state.search = "";
      state.status = "";
      state.currentPage = 1;
      state.users = [];
      state.loading = false;
      state.hasMore = true;
      state.startDate = null;
      state.endDate = null;
      state.sortedBy = { key: "name", order: "dsc", by: "about" };
    },
    setSortedBy: (state, action) => {
      const { key, order, by } = action.payload;
      state.sortedBy = { key, order, by };

      state.users = sortBy(state.users, key, by, order);
    },
    setUpdateDateRange: (state, action) => {
      const [startDate, endDate] = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = sortBy(
          [...state.users, ...action.payload.data],
          state.sortedBy.key,
          state.sortedBy.by,
          state.sortedBy.order
        );
        state.totalPages = action.payload.totalPages;
        state.userStats = {
          activeUsers: action.payload.activeUsers,
          inactiveUsers: action.payload.inactiveUsers,
          blockedUsers: action.payload.blockedUsers,
          totalUsers: action.payload.totalUsers,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        const { updatedUser } = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  resetState,
  setSearchText,
  setStatus,
  setHasMore,
  setOffset,
  setCurrentPage,
  handleClearFilters,
  setSortedBy,
  setUpdateDateRange,
} = usersSlice.actions;
export default usersSlice.reducer;
