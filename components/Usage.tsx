"use client";
import { motion, useAnimationControls } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import HowToStep from "./HowToStep";

export default function Usage() {
  const control = useAnimationControls();
  const steps = [
    { text: "Click 'Login or Get started' and fill in your email" },
    { text: "Check your email for a login link" },
    { text: "Click the link to access your Rooms page" },
    { text: "to update your name click on your profile !" },
    { text: "Start managing your cleaning tasks!" },
  ];
  return (
    <section className=" relative my-12 max-container padding-container w-full flex flex-col gap-4 items-center">
      <h2 className="  flex items-center gap-2 text-2xl xs:text-3xl  lg:text-4xl cursor-default text-green-50 font-bold text-center default-underline hover:text-accent-200 transition-all duration-100 ">
        <MessageCircleQuestion className=" w-8 h-10" /> How to Use
      </h2>
      <div className="max-w-2xl mx-auto text-lg">
        <ol className="space-y-1">
          {steps.map((step, index) => (
            <HowToStep key={step.text} number={index + 1} text={step.text} />
          ))}
        </ol>
      </div>
      <motion.div
        onClick={() => control.start("visible")}
        className="absolute left-2 -top-8 sm:left-20 md:left-36  lg:left-56 lg:top-3 xl:left-72 2xl:left-96   z-0 group"
        whileHover={{ rotate: "12deg" }}
      >
        <Image
          src="/basket.png"
          alt="basket image for cleaning"
          width={70}
          height={80}
          className="opacity-75 hover:opacity-95 transition-all duration-100 -rotate-12"
        />

        <div className="w-24 text-sm opacity-0 group-hover:opacity-100 absolute -top-10 left-0 bg-text-100 text-white px-4 py-1 rounded-lg transition-opacity duration-300">
          Let&apos;s Get Started!
        </div>
      </motion.div>
      <motion.div
        className="absolute -bottom-12   xs:right-0 xs:-bottom-10 sm:right-20 md:right-36 lg:right-56 lg:bottom-3   xl:right-64 2xl:right-76 z-0 group"
        whileHover={{ rotate: "-6deg" }}
        variants={{
          visible: {
            opacity: 1,
            rotate: ["-6deg", "3deg", "0deg"],
            transition: { duration: 1 },
          },
        }}
        initial={{ opacity: 0.7 }}
        animate={control}
      >
        <Image
          src="/office-cleaning.png"
          alt="cleaned office shine"
          width={70}
          height={80}
          className="opacity-75 hover:opacity-95 transition-all duration-100 lg:rotate-6"
        />

        <div className="w-32 text-xs rotate-6 opacity-0 group-hover:opacity-100 absolute -top-6 right-0 bg-black text-white px-4 py-1 rounded-lg transition-opacity duration-300">
          Scrub&Shine🥰
        </div>
      </motion.div>
      <motion.div
        variants={{
          visible: {
            opacity: 1,
            rotate: ["-3deg", "4deg", "0deg"],
            transition: { duration: 1 },
          },
        }}
        initial={{ opacity: 0.7 }}
        animate={control}
        className="absolute xxs:hidden sm:block right-8 -top-8 lg:right-16 xl:right-24 2xl:right-44 z-0 group"
      >
        <Image
          src="/house.png"
          alt="cleaned house"
          width={70}
          height={100}
          className="opacity-80 hover:opacity-95 transition-all duration-100"
        />

        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 right-0 bg-accent-300 text-white px-4 py-1 rounded-lg transition-opacity duration-300">
          Cleaned!
        </div>
      </motion.div>
      <div className=" my-6"></div>
    </section>
  );
}
