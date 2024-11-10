import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "./ui/Button";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

interface ConfirmDeleteProps {
  taskToDelete: Task | null;
  setTaskToDelete: (task: Task | null) => void;
  handleDeleteTask: () => void;
}

export default function ConfirmDeleteTask({
  taskToDelete,
  setTaskToDelete,
  handleDeleteTask,
}: ConfirmDeleteProps) {
  return (
    <Dialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
      <DialogContent className="sm:max-w-[425px] bg-[#efffff] xs:max-w-[320px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the task &quot;{taskToDelete?.title}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-1">
          <Button
            className=" border border-slate-500 hover:bg-slate-200 transition-all duration-100"
            variant="outline"
            onClick={() => setTaskToDelete(null)}
          >
            Cancel
          </Button>
          <Button
            className="border border-slate-500 text-white bg-red-500 hover:bg-red-600 hover:border-red-800 transition-all duration-100"
            variant="destructive"
            onClick={handleDeleteTask}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
