import { prisma } from "@/lib/prisma";
import { Email } from "@/lib/sendEmail";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!process.env.JWT_SECRET) {
      // return res.status(500).json({ error: "JWT_SECRET is not defined" });
      return NextResponse.json(
        { error: "JWT_SECRET is not defined" },
        { status: 500 }
      );
    }

    // If user doesn't exist, create a new user (but mark them as unverified)
    if (!user) {
      const name = email.split("@")[0];
      user = await prisma.user.create({
        data: {
          name,
          email,
          verified: false,
        },
      });
    }

    //  JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Generate a magic link URL
    const magicLink = `https://scrubandshine.onrender.com/api/auth/verify?token=${token}`;

    // Send email with magic link using the Email class
    const emailInstance = new Email(user, magicLink);
    await emailInstance.sendMagicLink(); // You can customize this method if needed

    // /    return res.status(200).json({ message: "Magic link sent to your email" });
    return NextResponse.json(
      { message: "Magic link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
