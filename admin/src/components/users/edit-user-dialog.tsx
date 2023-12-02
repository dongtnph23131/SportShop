import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { User, UserRole } from "@/types/base";

export const EditUserDialog = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="text-blue-600 hover:underline cursor-pointer font-semibold">
          Edit
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const firstName = (e.target as HTMLFormElement)["firstName"].value;
            const lastName = (e.target as HTMLFormElement)["lastName"].value;
            const email = (e.target as HTMLFormElement)["email"].value;
            const phone = (e.target as HTMLFormElement)["phone"].value;
            const role = (e.target as HTMLFormElement)["user-role"].value;

            try {
              setIsLoading(true);
              const res = await axiosClient.put(`/user/${user?._id}`, {
                firstName,
                lastName,
                email,
                role,
                phone,
              });
              if (res.status !== 200) {
                toast.error(res.data.message);
                setIsOpen(false);
                return;
              }
              toast.success("Updated user successfully!");
              queryClient.invalidateQueries({ queryKey: ["users"] });
              setIsOpen(false);
            } catch (error) {
              toast.error("Something went wrong!");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                defaultValue={user?.firstName}
                id="firstName"
                required
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right">
                Last Name
              </Label>
              <Input
                defaultValue={user?.lastName}
                id="lastName"
                required
                className="col-span-3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              defaultValue={user?.email}
              disabled
              id="email"
              type="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input defaultValue={user?.phone} id="phone" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right">
              Role
            </Label>
            <select
              id="user-role"
              defaultValue={user?.role}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.STAFF}>Staff</option>
              <option value={UserRole.SHIPPER}>Shipper</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
