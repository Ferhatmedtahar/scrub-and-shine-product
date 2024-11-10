"use client";
import { motion } from "framer-motion";
import Features from "./Features";
import Usage from "./Usage";
export default function AnimatedFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Features />
      <Usage />
    </motion.div>
  );
}
