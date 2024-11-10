"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Button } from "./ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function ConfirmSignOut({ isOpen, onClose, onConfirm }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#d5f1f1] xs:max-w-[320px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-1">
          <Button
            className="border border-slate-500 hover:bg-slate-200 transition-all duration-100"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="border border-slate-500 text-white bg-red-500 hover:bg-red-600 hover:border-red-800 transition-all duration-100"
            variant="destructive"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
