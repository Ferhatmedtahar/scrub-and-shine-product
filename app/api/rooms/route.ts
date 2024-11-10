import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Create a Room
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      console.error("Token not found in query params");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
    }

    // Verify and decode the token to get the user ID
    const decoded = verifyToken(token); // Implement this function to verify the token
    if (!decoded || !decoded.userId) {
      console.error("Invalid token or user ID not found");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if token is invalid
    }

    const userId = decoded.userId;

    const { title, description } = await req.json();

    // Ensure user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found. Cannot create room for non-existent user." },
        { status: 404 }
      );
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const roomExists = await prisma.room.findUnique({
      where: { slug },
    });

    if (roomExists) {
      return NextResponse.json(
        {
          error:
            "Room with this title or slug already exists. Please choose a different title.",
        },
        { status: 409 }
      );
    }

    // Create the room since the slug is unique
    const room = await prisma.room.create({
      data: {
        title,
        description,
        slug,
        taskCount: 0,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Room created", room },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/*


!  // REVIEW 

! Get All Rooms

*/
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      console.error("Token not found in query params");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
    }

    // Verify and decode the token to get the user ID
    const decoded = verifyToken(token); // Implement this function to verify the token
    if (!decoded || !decoded.userId) {
      console.error("Invalid token or user ID not found");
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if token is invalid
    }

    const userId = decoded.userId;

    const rooms = await prisma.room.findMany({
      where: { userId },
      include: {
        tasks: {
          select: {
            id: true,
            completed: true,
          },
        },
      },
    });

    const roomsWithTaskCounts = rooms.map((room) => ({
      ...room,
      totalTasks: room.tasks.length,
      completedTasks: room.tasks.filter((task) => task.completed).length,
    }));

    return NextResponse.json({ rooms, roomsWithTaskCounts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rooms:", error);

    return NextResponse.json(
      { error: "Failed to fetch rooms" },

      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
