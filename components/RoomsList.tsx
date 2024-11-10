"use client";
import RoomItem from "./RoomItem";
import { motion } from "framer-motion";
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

export default function RoomsList({
  roomsData,
  setRoomToDelete,
  onEdit,
}: {
  roomsData: any[];
  setRoomToDelete: any;
  onEdit: any;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  my-4"
    >
      {roomsData.map((room) => (
        <RoomItem
          key={room.title}
          room={room}
          onEdit={() => onEdit(room)} // Trigger edit
          setRoomToDelete={setRoomToDelete}
        />
      ))}
    </motion.div>
  );
}
