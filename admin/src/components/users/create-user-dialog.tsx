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

import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { UserRole } from "@/types/base";
import { Button } from "../ui/button";

export const CreateUserDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>Tạo mới thành viên</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo mới thành viên</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const firstName = (e.target as HTMLFormElement)["firstName"].value;
            const lastName = (e.target as HTMLFormElement)["lastName"].value;
            const email = (e.target as HTMLFormElement)["email"].value;
            const password = (e.target as HTMLFormElement)["password"].value;
            const role = (e.target as HTMLFormElement)["user-role"].value;
            const phone = (e.target as HTMLFormElement)["phone"].value;

            try {
              setIsLoading(true);
              const res = await axiosClient.post(`/user`, {
                firstName,
                lastName,
                email,
                password,
                role,
                phone,
              });

              toast.success("User is created successfully!");
              queryClient.invalidateQueries({ queryKey: ["users"] });
              setIsOpen(false);
            } catch (error) {
              toast.error((error as any).response.data.message);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right">
                Tên
              </Label>
              <Input id="firstName" required className="col-span-3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right">
                Họ
              </Label>
              <Input id="lastName" required className="col-span-3" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right">
              Mật khẩu
            </Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right">
              Số điện thoại
            </Label>
            <Input id="phone" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right">
              Vai trò
            </Label>
            <select
              id="user-role"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.STAFF}>Staff</option>
              <option value={UserRole.SHIPPER}>Shipper</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
