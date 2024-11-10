"use client";

import Image from "next/image";

export default function FooterButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button onClick={handleClick} className="gap-4 z-10">
      <Image
        className="cursor-pointer rounded-full aspect-square sm:h-14 sm:w-14 xs:h-10 xs:w-10 mr-6 hover:invert transition-all duration-700"
        alt="logo"
        src={"/logo1.png"}
        width={55}
        height={55}
        quality={95}
      />
    </button>
  );
}
