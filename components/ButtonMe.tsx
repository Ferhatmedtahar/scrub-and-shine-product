"use client";
import { motion } from "framer-motion";
export function Button({
  children,

  background,
  hoverBackground,
}: {
  children: React.ReactNode;
  background: string;
  hoverBackground: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, rotate: "2deg" }}
      transition={{ duration: 0.1, ease: "backInOut" }}
      className={` px-3 py-1 text-sm max-w-[150px] sm:max-w-[250px] lg:max-w-[300px] lg:py-3 lg:px-7 ${background} hover:${hoverBackground}  duration-100 transition-all   text-white font-semibold rounded-lg shadow-xl `}
    >
      {children}
    </motion.button>
  );
}
