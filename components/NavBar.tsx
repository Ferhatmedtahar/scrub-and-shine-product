"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ButtonMe";

import ConfirmSignOut from "./ConfirmSignout";
import Logo from "./Logo";
import Profile from "./Profile";

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}
type User = {
  name: string;
  email: string;
  id: string;
  verified: boolean;
  token: string;
};

export default function NavBar({ user }: { user: User | any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState<string>(user?.name ?? "Guest");
  const [logOutOpen, setLogOutOpen] = useState(false);

  const handleSignOut = async () => {
    setLogOutOpen(false);
    const response = await fetch(
      "https://scrubandshine.onrender.com/api/auth/signout",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (response.ok) {
      router.push("/");
    } else {
      console.error("Failed to sign out:", data);
    }

    // Optionally refresh the page
    router.refresh();
  };

  return (
    <nav className="bg-[#0843a8] shadow-md py-2 px-4">
      <div className="flex justify-between items-start">
        <ul className="flex justify-start items-center gap-6 px-4">
          <Logo />
          <li>
            <Link
              href={"/rooms"}
              className={`${
                isActive(pathname, "/rooms")
                  ? "underline-offset-4 underline text-[#00ff6f]"
                  : "text-blue-100"
              } hover:text-green-400 transition-colors duration-200  `}
            >
              Rooms
            </Link>
          </li>
        </ul>

        {user ? (
          <div className="relative group flex flex-row items-center gap-2">
            <button
              onClick={() => setLogOutOpen(true)}
              className="bg-blue-400 hover:bg-red-500   hover:border-red-700 hover:text-white px-2 py-1 text-sm max-w-[150px] sm:max-w-[250px] lg:max-w-[300px] lg:py-2 lg:px-4 text-blue-50 font-semibold rounded-lg  transition-all  shadow-xl duration-150"
            >
              Sign Out
            </button>
            <p
              onClick={() => setIsProfileModalOpen(true)}
              className="cyan-gradient cursor-pointer border border-blue-500 px-2 py-1 rounded-lg  font-semibold transition-colors duration-200"
            >
              {userName}
            </p>
          </div>
        ) : (
          <Button background="bg-primary-100" hoverBackground="bg-primary-200">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
      {user && (
        <Profile
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          name={user.name}
          userId={user.id}
          updateUser={setUserName}
        />
      )}
      <ConfirmSignOut
        onConfirm={handleSignOut}
        onClose={() => setLogOutOpen(false)}
        isOpen={logOutOpen}
      />
    </nav>
  );
}
