import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageClient from "./page-client";
export const metadata = {
  title: "Rooms",
};
function isValidJWT(token: string): boolean {
  const jwtPattern = /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+){2}$/;
  return jwtPattern.test(token);
}

export default async function Page() {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) {
    redirect("/login");
  }
  if (!isValidJWT(jwt)) {
    redirect("/login");
  }

  const data = await fetch(
    `https://scrubandshine.onrender.com/api/rooms?token=${jwt}`,
    {
      cache: "no-store",
    }
  );
  if (!data.ok) {
    // Handle error if fetching fails
    throw new Error("Failed to fetch rooms");
  }
  const { rooms: roomsData, roomsWithTaskCounts } = await data.json();
  const stats = {
    totalRooms: roomsWithTaskCounts.length,
    totalTasks: roomsWithTaskCounts.reduce(
      (acc: number, room: any) => acc + room.totalTasks,
      0
    ),
    CompletedTasks: roomsWithTaskCounts.reduce(
      (acc: number, room: any) => acc + room.completedTasks,
      0
    ),
  };

  return <PageClient roomsData={roomsData} jwt={jwt} stats={stats} />;
}
