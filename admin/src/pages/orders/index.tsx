import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import LayoutAdmin from "@/components/layouts";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { queryClient } from "@/lib/react-query";
import { NextPageWithLayout } from "@/pages/_app";
import { useOrdersQuery } from "@/services/orders/orders-query";
import { useProductDeleteMutation } from "@/services/products/product-delete-mutation";
import { Order, Product } from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

const Page: NextPageWithLayout = () => {
  const { data: orders } = useOrdersQuery();

  const columns: ColumnDef<Order>[] = [
    {
      id: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Id" />
      ),
      cell: ({ row }) => <div>{row.original.orderId}</div>,
    },
    {
      id: "createAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        return format(new Date(row.original.createdAt), "dd MMM yyyy");
      },
    },
    {
      id: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => {
        return row.original.fullName;
      },
    },
    {
      id: "delivery_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Status" />
      ),
      cell: ({ row }) => {
        return row.original.deliveryStatus;
      },
    },
    {
      id: "payment_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment Status" />
      ),
      cell: ({ row }) => {
        return row.original.paymentStatus;
      },
    },
    {
      id: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return row.original.status;
      },
    },
    {
      id: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => {
        return row.original.orderTotalPrice;
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
            <DropdownMenuItem asChild>
              <Link href={`/orders/${row.original._id}`}>View</Link>
            </DropdownMenuItem>
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
                        const res = await axiosClient.delete(
                          `/orders/${row.original._id}`
                        );

                        if (res.status !== 200) {
                          const error = res.data.message;
                          toast.error(error);
                          return;
                        }

                        queryClient.invalidateQueries({ queryKey: ["orders"] });

                        toast.success("Successfully deleted");
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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Here&apos;s a list of the orders!</CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable data={orders ?? []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
