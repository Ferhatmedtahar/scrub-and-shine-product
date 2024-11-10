"use client";
import { motion, useScroll, useTransform } from "framer-motion";
export default function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["#44a0fc", "#02c24f"]
  );

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, background }}
      className={` origin-left   fixed top-0 h-1 w-full z-50 `}
    />
  );
}
