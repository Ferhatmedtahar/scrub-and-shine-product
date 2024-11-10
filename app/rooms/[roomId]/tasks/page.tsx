import PageClient from "./page-client";

export const metadata = {
  title: "Tasks",
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomSlug = params.roomId; // This is the slug from the URL

  // Fetch tasks data based on the room slug
  const data = await fetch(
    `https://scrubandshine.onrender.com/api/tasks?roomId=${roomSlug}`,
    {
      cache: "no-store",
    }
  );
  const res = await data.json();

  // Handle possible error states
  if (res.error) {
    console.error(res.error);
    return <div>Error fetching tasks.</div>;
  }

  const tasksData = res.tasks;
  return <PageClient tasksData={tasksData} params={params} />;
}
