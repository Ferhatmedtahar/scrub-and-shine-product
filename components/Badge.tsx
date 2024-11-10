import React from "react";

export default function Badge({
  priority,
}: {
  priority: "High" | "Medium" | "Low";
}) {
  return (
    <span
      className={`text-xs font-medium me-2 px-2.5 py-[3px] rounded cursor-default
${
  priority === "High"
    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    : priority === "Medium"
    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
}
`}
    >
      {priority}
    </span>
  );
}
