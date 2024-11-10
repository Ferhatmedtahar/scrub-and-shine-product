import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, priority, roomId } = await req.json();

    // Check if the room exists
    const roomExists = await prisma.room.findUnique({
      where: { slug: roomId },
    });

    if (!roomExists) {
      return NextResponse.json(
        { error: "Room not found. Cannot create task for non-existent room." },
        { status: 404 }
      );
    }

    // Ensure there isn't already a task with the same title in the room
    const existingTask = await prisma.task.findFirst({
      where: { title, roomId: roomExists.id },
    });

    if (existingTask) {
      return NextResponse.json(
        { error: "Task with the same title already exists in this room." },
        { status: 409 }
      );
    }

    // Create the task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        roomId: roomExists.id,
      },
    });

    // Add the task to the room and increment taskCount
    await prisma.room.update({
      where: { id: roomExists.id },
      data: {
        tasks: {
          connect: { id: newTask.id },
        },
        taskCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    // Log the error to inspect what went wrong
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error.message }, // include error message in response
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParam = url.searchParams.get("roomId")!;
  const roomSlug = searchParam; // Extract room slug from params

  try {
    // Find the room using the slug
    const room = await prisma.room.findUnique({
      where: { slug: roomSlug }, // Make sure the room model has a slug field
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Now fetch tasks associated with the room ID
    const tasks = await prisma.task.findMany({
      where: {
        roomId: room.id, // Use the room ID to filter tasks
      },
      include: {
        room: true, // Include room data if needed
      },
    });

    return NextResponse.json({ status: "success", tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure you disconnect Prisma after the operation
  }
}
