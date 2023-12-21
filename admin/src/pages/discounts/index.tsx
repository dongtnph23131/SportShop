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
import { Discount, DiscountType, User } from "@/types/base";
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
import { EditDiscountDialog } from "@/components/discounts/edit-discount-dialog";
import { ExportCSVButton } from "@/components/export-button";

const Page: NextPageWithLayout = () => {
  const { data: discounts } = useDiscountsQuery();

  const columns: ColumnDef<Discount>[] = [
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã giảm giá" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold text-lg">{row.original.code}</span>
      ),
    },
    {
      id: "start_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày giờ áp dụng" />
      ),
      cell: ({ row }) =>
        format(new Date(row.original.startAt), "dd MMM yyyy hh:mm a"),
    },
    {
      id: "end_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày giờ hết hạn" />
      ),
      cell: ({ row }) =>
        row.original.endAt
          ? format(new Date(row.original.endAt), "dd MMM yyyy hh:mm a")
          : "Vô hạn",
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loại" />
      ),
      cell: ({ row }) => {
        if (row.original.type === DiscountType.PERCENTAGE)
          return <Badge>Phần trăm</Badge>;

        return <Badge>Số tiền</Badge>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.original.type);
      },
    },
    {
      id: "usageLimit",
      accessorKey: "usageLimit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số lượng sử dụng" />
      ),
      cell: ({ row }) => <span>{row.original.usageLimit}</span>,
    },
    {
      id: "usageCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số lượng giới hạn" />
      ),
      cell: ({ row }) => <span>{row.original.usageCount}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end mr-4">
          <AlertDialog>
            <AlertDialogTrigger className="text-red-500 hover:underline cursor-pointer font-semibold">
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

          <EditDiscountDialog discount={row.original} />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>Mã giảm giá</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <ExportCSVButton
            csvData={JSON.stringify(discounts)}
            fileName="discounts"
          />
          <CreateDiscountDialog />
        </div>
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
