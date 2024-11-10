import logo from "@/public/logo1.png";
import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 ">
      <Image
        className="cursor-pointer rounded-full aspect-square "
        alt="logo"
        src={logo}
        width={40}
        height={40}
        quality={95}
      />
    </Link>
  );
}
