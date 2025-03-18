"use client";

import { Users, UserCheck, UserX, UserMinus, ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";

const stats = [
  {
    icon: (
      <Users className="text-green-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
    ),
    label: "Total Users",
    key: "totalUsers",
  },
  {
    icon: (
      <UserCheck className="text-green-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
    ),
    label: "Active Users",
    key: "activeUsers",
  },
  {
    icon: (
      <UserMinus className="text-green-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
    ),
    label: "Inactive Users",
    key: "inactiveUsers",
  },
  {
    icon: (
      <UserX className="text-green-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
    ),
    label: "Blocked Users",
    key: "blockedUsers",
  },
];

export default function UserStatsCard() {
  const { userStats } = useSelector((state) => state.users);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 border border-[#B9B9B9] rounded-xl p-4 bg-white hover:shadow-md transition"
        >
          <div className="bg-green-100 p-3 rounded-lg shrink-0">
            {stat.icon}
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 font-medium">
              <span>{stat.label}</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-black mt-1">
              {stat.key === "blockedUsers" || stat.key === "inactiveUsers"
                ? `${userStats[stat.key]}%`
                : userStats[stat.key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
