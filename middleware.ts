import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/profile", "/rooms", "/tasks"];

  if (protectedRoutes.includes(pathname)) {
    const userId = await authenticate(request);
    if (userId) {
      // If authenticated, continue
      return NextResponse.next();
    }
    // If not authenticated, redirect to login
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}

// Configuration to match protected routes
export const config = {
  matcher: ["/api/:path*"],
};

// Authentication function to verify JWT and extract userId
export async function authenticate(req: NextRequest): Promise<boolean> {
  // Get the JWT from cookies
  const token = req.cookies.get("jwt")?.value || "";

  if (!token) {
    return false;
  }
  if (!isValidJWT(token)) {
    return false;
  }

  return true;
}

function isValidJWT(token: string): boolean {
  const jwtPattern = /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+){2}$/;
  return jwtPattern.test(token);
}
