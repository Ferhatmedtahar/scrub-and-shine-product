"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const UpdateProfileSchema = yup
  .object({
    name: yup
      .string()
      .required()
      .min(3, "name must be at least 3 characters")
      .max(25, " name must be less than 25 characters"),
  })
  .required();

export default function Profile({
  isOpen,
  onClose,
  name,
  userId,
  updateUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  userId: string;
  updateUser: (name: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateProfileSchema),
  });

  const onSubmit = (data: { name: string }) => {
    handleUpdateProfile(data);
  };

  const handleUpdateProfile = async ({ name }: { name: string }) => {
    // Update the user's name in the database
    const response = await fetch(
      `https://scrubandshine.onrender.com/api/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      // Handle error if needed (e.g., log it)
      console.error(`Failed to update user ${userId}:`, response.statusText);
      return;
    }

    // Update the user in the local state
    updateUser(name);

    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xs:max-w-[320px] xs:max-h-[400px] rounded-lg  sm:max-w-[425px] sm:max-h-[450px] bg-blue-100">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile name here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col  gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="col-span-3"
                placeholder={name}
              />
            </div>
            {errors.name && (
              <p className=" mx-auto text-red-600 bg-red-300 px-2 py-1 rounded text-sm w-fit ">
                {errors.name?.message} !
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
