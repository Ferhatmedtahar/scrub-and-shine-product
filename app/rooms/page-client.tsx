// page-client.tsx (client component)
"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import RoomDialog from "@/components/RoomDialog";
import RoomsList from "@/components/RoomsList";
import Stats from "@/components/Stats";
import basket from "@/public/basket.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Room {
  id: number;
  title: string;
  description: string;
  taskCount: number;
}

export default function PageClient({
  stats,
  roomsData,
  jwt,
}: {
  stats: any;
  roomsData: Room[];
  jwt: string;
}) {
  const router = useRouter();

  const [rooms, setRooms] = useState(roomsData);
  const [isEditing, setIsEditing] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!dialogOpen) {
      setIsEditing(false);
      setRoomToEdit(null);
      setDialogOpen(false);
    }
  }, [dialogOpen]);

  const addRoom = async (newRoom: Room) => {
    try {
      let response: Response;
      let responseData: any;

      if (isEditing && roomToEdit) {
        // Update room
        response = await fetch(
          `https://scrubandshine.onrender.com/api/rooms/${roomToEdit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...newRoom, id: roomToEdit.id }),
          }
        );

        // Parse the response
        try {
          responseData = await response.json();
        } catch (jsonError) {
          console.error("Failed to parse JSON during room update:", jsonError);
          throw new Error(
            "Failed to update room due to invalid response format."
          );
        }

        if (response.ok) {
          // Update the room in the state
          const { updatedRoom } = responseData;
          router.refresh();
          setRooms(
            rooms.map((room) =>
              room.id === roomToEdit.id ? { ...updatedRoom, id: room.id } : room
            )
          );
          setIsEditing(false);
          setRoomToEdit(null);
        } else {
          console.error(
            "Failed to update room:",
            responseData?.error || "Unknown error"
          );
          throw new Error(responseData?.error || "Failed to update room.");
        }
      } else {
        // Create new room
        response = await fetch(
          `https://scrubandshine.onrender.com/api/rooms?token=${jwt}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoom),
          }
        );

        // Parse the response
        try {
          responseData = await response.json();
        } catch (jsonError) {
          console.error(
            "Failed to parse JSON during room creation:",
            jsonError
          );
          throw new Error(
            "Failed to create room due to invalid response format."
          );
        }

        if (response.ok) {
          // Add the new room to the state
          const { room } = responseData;
          router.refresh();
          setRooms([...rooms, room]);
        } else {
          console.error(
            "Failed to create room:",
            responseData?.error || "Unknown error"
          );
          throw new Error(responseData?.error || "Failed to create room.");
        }
      }
    } catch (error) {
      console.error("Error while adding/updating room:", error);
      // Optional: Set an error message state for the UI
      // setErrorMessage(error.message || "An error occurred while adding/updating the room.");
    }
  };

  const handleEditRoom = (room: Room) => {
    setRoomToEdit(room);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const DeleteRoom = (room: Room) => {
    setRoomToDelete(room);
  };

  const handleDeleteRoom = async () => {
    if (roomToDelete) {
      try {
        const response = await fetch(
          `https://scrubandshine.onrender.com/api/rooms/${roomToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          router.refresh();
          setRooms(rooms.filter((room) => room.id !== roomToDelete.id));
          setRoomToDelete(null);
        } else {
          console.error("Failed to delete room:", await response.json());
        }
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  return (
    <main className="max-container padding-container flex flex-col gap-4  ">
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <Stats stats={stats} />
        <RoomDialog
          onAddRoom={addRoom}
          room={roomToEdit}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
      {rooms.length > 0 ? (
        <RoomsList
          setRoomToDelete={DeleteRoom}
          roomsData={rooms}
          onEdit={handleEditRoom}
        />
      ) : (
        <div className="m-4 flex flex-col py-10 text-center text-xl text-slate-400 opacity-80 hover:opacity-100 transition-all duration-100">
          <p className="mb-4">
            It looks like you haven’t created any rooms yet!
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg ">
              Start by adding rooms to get things rolling
            </p>
            <Image
              src={basket}
              alt="logo"
              width={30}
              height={30}
              className="rotate-12  opacity-70 "
            />
          </div>
        </div>
      )}

      <ConfirmDelete
        roomToDelete={roomToDelete}
        setRoomToDelete={setRoomToDelete}
        handleDeleteRoom={handleDeleteRoom}
      />
    </main>
  );
}
