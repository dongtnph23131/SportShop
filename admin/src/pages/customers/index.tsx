import { CreateGiftCardDialog } from "@/components/customers/create-gift-dialog";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ExportCSVButton } from "@/components/export-button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosClient from "@/lib/axios-instance";
import { queryClient } from "@/lib/react-query";
import { formatPrice } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import {
  CustomersResponse,
  useCustomersQuery,
} from "@/services/customers/customers-query";
import { useProductDeleteMutation } from "@/services/products/product-delete-mutation";
import { Customer } from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

const Page: NextPageWithLayout = () => {
  const { data: customers } = useCustomersQuery();

  const columns: ColumnDef<CustomersResponse>[] = [
    {
      id: "name",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên khách hàng" />
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
            <AvatarFallback>OM</AvatarFallback>
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
      id: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => (
        <span>{format(new Date(row.original.createdAt), "dd MMM yyyy")}</span>
      ),
    },
    {
      id: "orders",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số lượng đơn hàng" />
      ),
      cell: ({ row }) => <span>{row.original.orderIds.length}</span>,
    },
    {
      id: "amountSpent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số tiền chi" />
      ),
      cell: ({ row }) => {
        const amountSpent = row.original.orderIds.reduce((acc, curr) => {
          return acc + curr.orderTotalPrice;
        }, 0);

        return <span>{formatPrice(amountSpent)}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div>
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
              <CreateGiftCardDialog customerId={row.original._id} />

              <DropdownMenuItem asChild>
                <Link href={`/customers/${row.original._id}`}>
                  Xem chi tiết
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full text-left hover:bg-red-100 hover:text-red-600 cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">
                    Xóa
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            const res = await axiosClient.delete(
                              `/customers/${row.original._id}`
                            );

                            if (res.status === 200) {
                              queryClient.invalidateQueries({
                                queryKey: ["customers"],
                              });

                              toast.success("Xóa thành công");
                            }
                          } catch (error) {
                            toast.error("Xóa thất bại");
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
        </div>
      ),
    },
  ];

  return (
    <>
      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Khách hàng</CardTitle>
          </CardHeader>
          <ExportCSVButton
            csvData={JSON.stringify(customers)}
            fileName="customers"
          />
        </div>
        <CardContent>
          <DataTable data={customers ?? []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
