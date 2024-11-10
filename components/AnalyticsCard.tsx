"use client";
import { motion } from "framer-motion";
const item = {
  hidden: { y: 2, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
function AnalyticsCard({
  title,
  value,
  total,
}: {
  title: string;
  value: number;
  total?: number;
}) {
  if (!total) total = 0;
  return (
    <motion.div
      variants={item}
      className={` ${
        value / total === 1
          ? "bg-accent-200 hover:bg-accent-100"
          : "hover:bg-bg-300"
      }  border border-gray-300 flex flex-col   rounded-lg  px-10 py-4   sm:py-6 sm:px-10 md:p-4 lg:py-6 lg:px-9 transition-all duration-300 `}
    >
      <div className="flex flex-row items-center justify-between pb-2 ">
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>

      <div className="text-2xl font-bold cursor-default">
        {value}
        {total ? (
          <span className="text-sm text-gray-500 hover:text-accent-200 transition-all duration-200 ">
            {" "}
            /{total}
          </span>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
}
export default AnalyticsCard;
