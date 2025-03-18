"use client";

import {
  setSortedBy,
  setSortedByDetails,
  updateUsers,
} from "@/redux/usersSlice";
import {
  FaBan,
  FaCheck,
  FaInfoCircle,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  const dateObj = new Date(`${year}-${month}-${day}`);
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function DataTable() {
  const { users: data, sortedBy } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-[1rem] text-gray-600">
            <tr>
              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">
                  Name{" "}
                  {sortedBy.order === "asc" && sortedBy.key === "name" ? (
                    <FaSortAmountUp
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "name",
                            order: "dsc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "name",
                            order: "asc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </th>

              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">
                  Email{" "}
                  {sortedBy.order === "asc" && sortedBy.key === "email" ? (
                    <FaSortAmountUp
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "email",
                            order: "dsc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "email",
                            order: "asc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </th>

              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">
                  Start Date{" "}
                  {sortedBy.order === "asc" && sortedBy.key === "date" ? (
                    <FaSortAmountUp
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "date",
                            order: "dsc",
                            by: "details",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "date",
                            order: "asc",
                            by: "details",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </th>

              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">
                  Invited by{" "}
                  {sortedBy.order === "asc" && sortedBy.key === "invitedBy" ? (
                    <FaSortAmountUp
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "invitedBy",
                            order: "dsc",
                            by: "details",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "invitedBy",
                            order: "asc",
                            by: "details",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </th>

              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">
                  Status{" "}
                  {sortedBy.order === "asc" && sortedBy.key === "status" ? (
                    <FaSortAmountUp
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "status",
                            order: "dsc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        dispatch(
                          setSortedBy({
                            key: "status",
                            order: "asc",
                            by: "about",
                          })
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
              </th>

              <th className="px-6 py-3 pt-8 text-left font-medium">
                <div className="flex items-center gap-2">Action </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800 border-b border-gray-200">
                  {user.about.name}
                </td>

                <td className="px-6 py-4 text-gray-600 border-b border-gray-200">
                  {user.about.email}
                </td>

                <td className="px-6 py-4 text-gray-600 border-b border-gray-200">
                  {formatDate(user.details.date)}
                </td>

                <td className="px-6 py-4 text-gray-600 border-b border-gray-200">
                  {user.details.invitedBy}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  <span
                    className={`inline-flex w-[120px] h-[40px] items-center justify-center px-3 py-1 text-[1rem] font-semibold rounded-md ${
                      user.about.status === "ACTIVE"
                        ? "bg-green-50 text-[#39E299] border border-[#39E299]"
                        : user.about.status === "BLOCKED"
                        ? "bg-red-50 text-[#F78896] border border-[#F78896]"
                        : "bg-blue-50 text-[#6DAFFF] border border-[#6DAFFF]"
                    }`}
                  >
                    {user.about.status.slice(0, 1) +
                      user.about.status.slice(1).toLowerCase()}
                  </span>
                </td>

                <td className="px-6 py-4 flex items-center gap-4 border-b border-gray-200">
                  <button
                    onClick={() =>
                      dispatch(
                        updateUsers({
                          ...user,
                          about: { ...user.about, status: "BLOCKED" },
                        })
                      )
                    }
                    title="Block"
                    className="text-[#F78896] cursor-pointer border border-[#F78896] p-[8px] rounded-[5px] hover:bg-red-100"
                  >
                    <FaBan size={20} />
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        updateUsers({
                          ...user,
                          about: { ...user.about, status: "ACTIVE" },
                        })
                      )
                    }
                    title="Active"
                    className="text-[#39E299] cursor-pointer border border-[#39E299] p-[8px] rounded-[5px] hover:bg-green-100"
                  >
                    <FaCheck size={20} />
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        updateUsers({
                          ...user,
                          about: { ...user.about, status: "INVITED" },
                        })
                      )
                    }
                    title="INVITED"
                    className="text-[#D8D8D8] cursor-pointer border border-[#D8D8D8] p-[8px] rounded-[5px] hover:bg-gray-100"
                  >
                    <FaInfoCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
