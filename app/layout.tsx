import "@/app/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import { verifyToken } from "@/lib/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: {
    default: "Scrub&Shine",
    template: "%s | Scrub&Shine",
  },
  description:
    " Stay organized, save time and see all the rooms to scrub and shine, tasks for each room , track your progress and organize your tasks !",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jwtCookie = cookies().get("jwt");
  const jwt = jwtCookie ? jwtCookie.value : null;

  let user = null;
  if (jwt) {
    const decoded = verifyToken(jwt); // Assuming this is the token verification
    if (decoded && decoded.userId) {
      const data = await fetch(
        `https://scrubandshine.onrender.com/api/users/${decoded.userId}`
      );
      const result = await data.json();
      user = result?.user ?? null;
    }
  }

  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col bg-gradient-to-r from-[#f7f6f6] to-[#efffff] ">
        <NavBar user={user} />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
