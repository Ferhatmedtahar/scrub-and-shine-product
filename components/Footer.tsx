import { Github, Linkedin } from "lucide-react";
import FooterButton from "./FooterButton";

export default function Footer() {
  return (
    <footer className="max-Container padding-container p-8 h-40 bg-darkPrimary-300 border-t-2 border-gray-400 flex justify-center items-center sm:gap-8 xs:gap-2">
      <FooterButton />
      <div className="flex flex-col gap-4 ">
        <h1 className="text-lg lg:text-xl cursor-default  text-black font-semibold text-center default-underline hover:text-blue-950 transition-all duration-100 ">
          Scrub&Shine
        </h1>
        <h2 className="text-sm lg:text-md cursor-default  text-black font-semibold text-center  default-underline hover:text-blue-950  transition-all duration-100 ">
          Copyright © {new Date().getFullYear()} - All right reserved
        </h2>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4 ">
          <a
            href="https://github.com/Ferhatmedtahar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="text-[#24292f] hover:text-[#520da1] transition-all duration-100" />
          </a>
          <a
            href="https://www.linkedin.com/in/ferhat-mohamed-tahar-839672267"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="text-[#0077b5] hover:text-[#0047b5] transition-all duration-100" />
          </a>
        </div>
      </nav>
    </footer>
  );
}
