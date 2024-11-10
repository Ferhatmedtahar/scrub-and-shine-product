"use client";
import { motion } from "framer-motion";
import AnalyticsCard from "./AnalyticsCard";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function Stats({ stats }: { stats: any }) {
  const { totalTasks, totalRooms, CompletedTasks } = stats;

  const analyticsData = [
    {
      title: "Total Tasks",
      value: totalTasks,
    },
    {
      title: "Total Rooms",
      value: totalRooms,
    },
    {
      title: "Completed Tasks",
      value: CompletedTasks,
      total: totalTasks, // This includes the `total` property
    },
  ];

  return (
    <div className=" flex  justify-between items-center flex-col gap-3 md:flex-row ">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 max-w-[800px]  "
      >
        {analyticsData.map((data, index) => (
          <AnalyticsCard
            key={index}
            title={data.title}
            value={data.value}
            total={data.total}
          />
        ))}
      </motion.div>
    </div>
  );
}
