"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/TextArea";
import { Button } from "@/components/ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlert, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type Task = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

type Inputs = {
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
};

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(), // Optional field
  priority: yup
    .string()
    .oneOf(["High", "Medium", "Low"])
    .required("Priority is required"),
});

function AddTaskDialog({
  onAddTask,
  task,
  open,
  setOpen,
}: {
  onAddTask: any;
  task: Task | null;
  open: boolean;
  setOpen: (open: boolean) => void; // Pass the setOpen function from the parent
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  //!react hook form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(taskSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddTask(data);
  };

  useEffect(() => {
    if (!open) {
      // Reset the form when the dialog is closed
      setTitle("");
      setDescription("");
      setPriority("Medium");
      reset();
      return; // Exit early to avoid unnecessary updates
    }

    if (task !== null) {
      // If a room is provided, populate the form with its data
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task, open, reset]);

  const handleAddTask = (data: Inputs) => {
    const { title, description, priority } = data;
    onAddTask({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[320px] xs:max-h-[400px] rounded-lg  sm:max-w-[425px] sm:max-h-[450px] bg-blue-50">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Modify the task details. Click save when you're done."
              : "Create a new task. Click create when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              {...register("title", { required: true })}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          {errors.title && (
            <span className="text-red-500 bg-red-200 p-1 text-sm rounded xs:max-w-[200px] self-center text-center flex gap-2 items-center">
              <CircleAlert className="h-4 w-4" /> the title is required !
            </span>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="room-description"
              className="text-right flex flex-col gap-0.5"
            >
              Description{" "}
              <span className="text-slate-400 text-xs">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              {...register("description")}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <div className="col-span-3 flex gap-4">
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  {...register("priority", { required: true })}
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                />
                <span className="text-green-500">Low</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  {...register("priority", { required: true })}
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                />
                <span className="text-yellow-500">Medium</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  {...register("priority", { required: true })}
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                />
                <span className="text-red-500">High</span>
              </Label>
            </div>
            {errors.priority && (
              <span className="text-red-500 bg-red-200 p-1 text-sm rounded xs:max-w-[200px] self-center text-center flex gap-2 items-center">
                <CircleAlert className="h-4 w-4" /> Priority is required!
              </span>
            )}
          </div>

          <Button type="submit" className="ml-auto">
            {task ? "Save Changes" : "Create Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AddTaskDialog;
