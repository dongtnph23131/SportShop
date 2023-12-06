import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useBannersQuery } from "@/services/banners/banners-query";
import { ColumnDef } from "@tanstack/react-table";
import { Banner, BannerStatus } from "@/types/base";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DataTable } from "./data-table/data-table";
import { CreateEditBannerDialog } from "./create-edit-banner-dialog";
import axiosClient from "@/lib/axios-instance";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

const BannerManagement = () => {
  const { data: banners } = useBannersQuery();

  const columns: ColumnDef<Banner>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-4 items-center">{row.original.name}</div>
        );
      },
    },
    {
      id: "fddsa",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === BannerStatus.ACTIVE
              ? "success"
              : "secondary"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ảnh" />
      ),
      cell: ({ row }) => {
        return (
          <Avatar className="h-20 w-40 rounded-sm border border-gray-200">
            <AvatarImage src={row.original.image} alt="Avatar" />
            <AvatarFallback>Banner</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger className="text-red-500 font-semibold">
              Xóa
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      const res = await axiosClient.delete(
                        `/banners/${row.original._id}`
                      );

                      if (res.status === 200) {
                        toast.success("Successfully deleted banner");
                        queryClient.invalidateQueries({
                          queryKey: ["banners"],
                        });
                      } else {
                        toast.error("Something went wrong");
                      }
                    } catch (error) {}
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CreateEditBannerDialog banner={row.original} />
        </div>
      ),
    },
  ];

  return (
    <Card className="mt-4">
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>Banner</CardTitle>
          <CardDescription>Manage your shop banners</CardDescription>
        </CardHeader>
        <div className="m-8">
          <CreateEditBannerDialog />
        </div>
      </div>

      <CardContent>
        <CardContent>
          <DataTable data={banners ?? []} columns={columns} />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default BannerManagement;
