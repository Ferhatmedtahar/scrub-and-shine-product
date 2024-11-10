"use client";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";
import { Checkbox } from "./Checkbox";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

export default function TaskCard({
  task,
  toggleTaskCompletion,
  onEdit, // Pass the onEdit handler from parent
  setTaskToDelete,
}: {
  task: Task;
  toggleTaskCompletion: () => void;
  onEdit: () => void;
  setTaskToDelete: (task: Task) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { title, description, priority } = task;

  return (
    <motion.div variants={item}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={toggleTaskCompletion}
              className={` h-7 w-7 rounded-full transition-colors duration-100
              ${
                task.completed
                  ? "bg-green-400 hover:bg-green-400/70 "
                  : " hover:bg-red-400/65"
              }`}
            />
            <CardTitle
              className={`text-lg font-semibold ${
                task.completed
                  ? "line-through text-muted-foreground text-slate-500"
                  : ""
              }`}
            >
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge priority={priority} />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">
                {expanded ? "Collapse" : "Expand"} task details
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {description ? (
            <p
              className={`text-sm text-muted-foreground ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {description}
            </p>
          ) : (
            <p className="text-xs text-gray-400 mb-4 sm:text-sm md:text-base ">
              no description specified
            </p>
          )}
          {expanded && (
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-blue-400 hover:text-white hover:border-blue-700 duration-200 transition-all"
                onClick={onEdit} // Call the onEdit handler
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
                <span className="sr-only">Edit task</span>
              </Button>
              <Button
                onClick={() => setTaskToDelete(task)}
                size="sm"
                className="hover:bg-red-500 hover:border-red-700 hover:text-white duration-200 transition-all"
                variant="outline"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
                <span className="sr-only">Delete task</span>
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={toggleTaskCompletion}
              >
                {task.completed ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" /> Mark as Unfinished
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Mark as Finished
                  </>
                )}
                <span className="sr-only">
                  {task.completed
                    ? "Mark task as unfinished"
                    : "Mark task as finished"}
                </span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
