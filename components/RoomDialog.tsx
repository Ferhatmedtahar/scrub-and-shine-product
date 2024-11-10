"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlert, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "./ui/Button";

interface Room {
  title: string;
  description?: string;
  taskCount: number;
}

type Inputs = {
  title: string;
  description?: string;
};
const roomSchema = Yup.object().shape({
  title: Yup.string()
    .required("The title is required!")
    .min(2, "Title should be at least 2 characters long"),
  description: Yup.string()
    .max(150, "Description should be less than 150 characters")
    .optional(),
});

export default function RoomDialog({
  onAddRoom,
  room,
  open,
  setOpen,
}: {
  onAddRoom: any;
  room: Room | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  // !controlled elements
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(roomSchema), // Integrating Yup with React Hook Form
  });

  // !submit handler
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleAddRoom(data);
  };

  const [roomTitle, setRoomTitle] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  useEffect(() => {
    if (!open) {
      setRoomTitle("");
      setRoomDescription("");
      reset();
      return;
    }

    if (room !== null) {
      setRoomTitle(room.title);
      setRoomDescription(room?.description ?? "");
    }
  }, [room, open, reset]);

  const handleAddRoom = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    const newRoom: Room = {
      title,
      description,
      taskCount: 0,
    };
    onAddRoom(newRoom);
    setRoomTitle("");
    setRoomDescription("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="max-w-[300px]">
        <Button>
          <Plus className="mr-2 h-4 w-4 " /> Add New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg xs:max-w-[320px] xs:max-h-[350px]  sm:max-w-[425px] sm:max-h-[450px] bg-blue-50">
        <DialogHeader>
          <DialogTitle>{room ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {room
              ? "Modify the Room details. Click save when you're done."
              : "Create a new room. Click create when you're done."}
          </DialogDescription>
        </DialogHeader>
        {/* onSubmit={handleAddRoom} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col  gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-title" className="text-right">
                Title
              </Label>
              <Input
                id="room-title"
                value={roomTitle}
                {...register("title", { required: true })}
                onChange={(e) => setRoomTitle(e.target.value)}
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
                id="room-description"
                value={roomDescription}
                {...register("description")}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {" "}
              {room ? "Save Changes" : "Create Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
