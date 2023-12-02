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
import { ColumnDef } from "@tanstack/react-table";
import { Discount, User } from "@/types/base";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { DataTableToolbar } from "@/components/discounts/data-table-toolbar";
import { useDiscountsQuery } from "@/services/discounts/discounts-query";
import { CreateDiscountDialog } from "@/components/discounts/create-discount-dialog";

const Page: NextPageWithLayout = () => {
  const { data: discounts } = useDiscountsQuery();

  const columns: ColumnDef<Discount>[] = [
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold text-lg">{row.original.code}</span>
      ),
    },
    {
      id: "start_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start At" />
      ),
      cell: ({ row }) =>
        format(new Date(row.original.startAt), "dd MMM yyyy hh:mm a"),
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <Badge>{row.original.type}</Badge>,
      filterFn: (row, id, value) => {
        return value.includes(row.original.type);
      },
    },
    {
      id: "usageLimit",
      accessorKey: "usageLimit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Count" />
      ),
      cell: ({ row }) => <span>{row.original.usageLimit}</span>,
    },
    {
      id: "usageCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Usage Count" />
      ),
      cell: ({ row }) => <span>{row.original.usageCount}</span>,
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
                            `/discounts/${row.original._id}`
                          );
                          if (res.status !== 200) {
                            toast.error(res.data.message);
                            return;
                          }
                          toast.success("Deleted discount successfully!");
                          queryClient.invalidateQueries({
                            queryKey: ["discounts"],
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
          <CardTitle>Discounts</CardTitle>
          <CardDescription>
            Manage discounts of your Sport Shop!
          </CardDescription>
        </CardHeader>
        <CreateDiscountDialog />
      </div>
      <CardContent>
        <DataTable
          columns={columns}
          data={discounts ?? []}
          toolbar={(table) => <DataTableToolbar table={table} />}
        />
      </CardContent>
    </Card>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
