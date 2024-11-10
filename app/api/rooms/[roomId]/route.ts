import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get Room by ID
export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        tasks: true, // Include related tasks
        user: true, // Include the user who created the room
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update Room by ID
export async function PUT(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    const { title, description } = await req.json();

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(
      { message: "Room updated", updatedRoom },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Room by ID
export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;

    // Delete the room, and cascading will handle related tasks
    const deletedRoom = await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json(
      { message: "Room and related tasks deleted", deletedRoom },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting room:", error);

    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
