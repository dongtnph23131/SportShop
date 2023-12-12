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
import { Button } from "./ui/button";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { UserRole } from "@/types/base";
import { useUsersQuery } from "@/services/users/users-query";
import { Truck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/router";

export const ChooseShipperDialog = ({ title }: { title: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { data: users } = useUsersQuery();

  const shippers = users?.filter((user) => user.role === UserRole.SHIPPER);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Truck className="h-4 w4 mr-2" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chọn nhân viên giao hàng</DialogTitle>
        </DialogHeader>
        <ul className="max-h-80 overflow-y-scroll">
          {shippers?.map((shipper) => {
            return (
              <li
                key={shipper._id}
                className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-md"
                onClick={async () => {
                  try {
                    await axiosClient.put(`/orders/${router.query.id}/ship`, {
                      shipperId: shipper._id,
                    });
                    toast.success("Assign shipper successfully");
                    queryClient.invalidateQueries({ queryKey: ["orders"] });
                    setIsLoading(false);
                    setIsOpen(false);
                  } catch (error) {
                    toast.error("Assign shipper failed");
                    setIsLoading(false);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={shipper?.avatar} alt="Avatar" />
                    <AvatarFallback>{shipper?.firstName}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-medium">
                      {shipper?.firstName + " " + shipper?.lastName}
                    </h3>
                    <p className="text-gray-800 text-sm">{shipper?.phone}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
