import React from "react";
import { NextPageWithLayout } from "../_app";
import LayoutAdmin from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUsersQuery } from "@/services/users/users-query";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/base";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/alert-dialog";
import { DataTable } from "@/components/data-table/data-table";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { Badge } from "@/components/ui/badge";
import { DataTableToolbar } from "@/components/users/data-table-toolbar";
import { EditUserDialog } from "@/components/users/edit-user-dialog";
import { CreateUserDialog } from "@/components/users/create-user-dialog";

const Page: NextPageWithLayout = () => {
  const { data: users } = useUsersQuery();

  const columns: ColumnDef<User>[] = [
    {
      id: "name",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                row.original.avatar ??
                "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              }
              alt="Avatar"
            />
            <AvatarFallback>{row.original.firstName}</AvatarFallback>
          </Avatar>
          {row.original.firstName}
        </div>
      ),
    },
    {
      id: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      id: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số điện thoại" />
      ),
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant={"success"}>Active</Badge>
        ) : (
          <Badge variant={"destructive"}>Inactive</Badge>
        ),
      filterFn: (row, id, value) => {
        const rowValue = row.original.isActive ? "Active" : "Inactive";
        return value.includes(rowValue);
      },
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => (
        <Badge className="capitalize">{row.original.role}</Badge>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.original.role);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end mr-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span className="text-red-500 hover:underline cursor-pointer font-semibold">
                Xóa{" "}
              </span>
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
                        `/user/${row.original._id}`
                      );
                      if (res.status !== 200) {
                        toast.error(res.data.message);
                        return;
                      }
                      toast.success("User is created successfully!");
                      queryClient.invalidateQueries({
                        queryKey: ["users"],
                      });
                    } catch (error) {
                      toast.error("Something went wrong!");
                    }
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <EditUserDialog user={row.original} />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>Quản lý thành viên</CardTitle>
        </CardHeader>
        <CreateUserDialog />
      </div>
      <CardContent>
        <DataTable
          columns={columns}
          data={users ?? []}
          toolbar={(table) => <DataTableToolbar table={table} />}
        />
      </CardContent>
    </Card>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
