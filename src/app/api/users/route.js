import { USERS_MOCK_DATA } from "../../../../DATA";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const statusQuery = searchParams.get("status")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");
  const offset = parseInt(searchParams.get("offset") || "0");

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const recordsPerPage = 10;
  const scrollBatchSize = 5;

  let filteredUsers = USERS_MOCK_DATA;

  if (searchQuery) {
    filteredUsers = filteredUsers.filter((user) =>
      user.about.name.toLowerCase().includes(searchQuery)
    );
  }

  if (statusQuery) {
    filteredUsers = filteredUsers.filter(
      (user) => user.about.status.toLowerCase() === statusQuery
    );
  }

  if (startDate && endDate) {
    filteredUsers = filteredUsers.filter((user) => {
      const createdAt = new Date(user.details.date);
      return (
        createdAt >= new Date(startDate) && createdAt <= new Date(startDate)
      );
    });
  }

  const totalUsers = USERS_MOCK_DATA.length;

  const activeUsers = filteredUsers.filter(
    (user) => user.about.status.toLowerCase() === "active"
  ).length;

  const inactiveUsers = filteredUsers.filter(
    (user) => user.about.status.toLowerCase() === "inactive"
  ).length;

  const blockedUsers = filteredUsers.filter(
    (user) => user.about.status.toLowerCase() === "blocked"
  ).length;

  const startIndex = (page - 1) * recordsPerPage + offset;
  const endIndex = startIndex + scrollBatchSize;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return Response.json({
    data: paginatedUsers,
    page,
    offset,
    totalUsers,
    totalFilteredUsers: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / recordsPerPage),
    activeUsers,
    inactiveUsers,
    blockedUsers,
  });
}

export async function PUT(request) {
  try {
    const updatedUser = await request.json();

    const userIndex = USERS_MOCK_DATA.findIndex(
      (user) => user.id === updatedUser.id
    );

    if (userIndex === -1) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    USERS_MOCK_DATA[userIndex] = {
      ...USERS_MOCK_DATA[userIndex],
      about: {
        ...USERS_MOCK_DATA[userIndex].about,
        ...updatedUser.about,
      },
      details: {
        ...USERS_MOCK_DATA[userIndex].details,
        ...updatedUser.details,
      },
    };

    return Response.json({
      message: "User updated successfully",
      updatedUser: USERS_MOCK_DATA[userIndex],
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating user", error: error.message }),
      { status: 500 }
    );
  }
}
