import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("jwt");

    if (!cookie) {
      return NextResponse.json(
        { error: "Failed to loggin out" },
        { status: 401 }
      );
    }
    const response = NextResponse.json({ message: "Successfully signed out" });
    response.cookies.set("jwt", "", {
      maxAge: 0, // This effectively deletes the cookie
      path: "/", // Ensure the path matches where the cookie was set
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error : Failed to loggin out " },
      { status: 500 }
    );
  }
}
