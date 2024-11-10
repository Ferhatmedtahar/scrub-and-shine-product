import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "./ui/Button";

interface Room {
  id: number;
  title: string;
  description: string;
  taskCount: number;
}

interface ConfirmDeleteProps {
  roomToDelete: Room | null;
  setRoomToDelete: (room: Room | null) => void;
  handleDeleteRoom: () => void;
}

export default function ConfirmDelete({
  roomToDelete,
  setRoomToDelete,
  handleDeleteRoom,
}: ConfirmDeleteProps) {
  return (
    <Dialog open={!!roomToDelete} onOpenChange={() => setRoomToDelete(null)}>
      <DialogContent className="sm:max-w-[425px] bg-[#efffff] xs:max-w-[320px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the room &quot;{roomToDelete?.title}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-1">
          <Button
            className=" border border-slate-500 hover:bg-slate-200 transition-all duration-100"
            variant="outline"
            onClick={() => setRoomToDelete(null)}
          >
            Cancel
          </Button>
          <Button
            className="border border-slate-500 text-white bg-red-500 hover:bg-red-600 hover:border-red-800 transition-all duration-100"
            variant="destructive"
            onClick={handleDeleteRoom}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
