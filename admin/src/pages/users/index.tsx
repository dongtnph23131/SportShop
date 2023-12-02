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
import { Button } from "@/components/ui/button";
import { useUsersQuery } from "@/services/users/users-query";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/base";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { DataTable } from "@/components/data-table/data-table";
import { CreateUserDialog } from "@/components/create-user-dialog";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { Badge } from "@/components/ui/badge";
import { DataTableToolbar } from "@/components/users/data-table-toolbar";
import { EditUserDialog } from "@/components/edit-user-dialog";

const Page: NextPageWithLayout = () => {
  const { data: users } = useUsersQuery();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const columns: ColumnDef<User>[] = [
    {
      id: "name",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
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
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
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
      cell: ({ row }) => <Badge>{row.original.role}</Badge>,
      filterFn: (row, id, value) => {
        return value.includes(row.original.role);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {row.original.isActive ? (
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const res = await axiosClient.put(
                      `/user/${row.original._id}/deactive`
                    );
                    if (res.status !== 200) {
                      toast.error(res.data.message);
                      return;
                    }
                    toast.success("Deactive user successfully!");
                    queryClient.invalidateQueries({
                      queryKey: ["users"],
                    });
                  } catch (error) {
                    toast.error("Something went wrong!");
                  }
                }}
              >
                Deactive
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const res = await axiosClient.put(
                      `/user/${row.original._id}/active`
                    );
                    if (res.status !== 200) {
                      toast.error(res.data.message);
                      return;
                    }
                    toast.success("Active user successfully!");
                    queryClient.invalidateQueries({
                      queryKey: ["users"],
                    });
                  } catch (error) {
                    toast.error("Something went wrong!");
                  }
                }}
              >
                Active
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger className="w-full text-left hover:bg-red-100 hover:text-red-600 cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>User management</CardTitle>
          <CardDescription>Manage users of your Sport Shop!</CardDescription>
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
