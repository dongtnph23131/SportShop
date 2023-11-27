import { ExportCSVButton } from "@/components/export-button";
import LayoutAdmin from "@/components/layouts";
import { SwitchGroup, SwitchGroupItem } from "@/components/switch-group";
import TablePagination from "@/components/table-pagination";
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
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosClient from "@/lib/axios-instance";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { queryClient } from "@/lib/react-query";
import { cn, formatPrice } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import { useAllOrdersQuery } from "@/services/orders/all-orders-query";
import { useOrdersQuery } from "@/services/orders/orders-query";

import { Order, OrderStatus } from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const renderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return <Badge variant={"destructive"}>{status}</Badge>;
    case OrderStatus.COMPLETED:
      return <Badge variant={"success"}>{status}</Badge>;
    case OrderStatus.PENDING:
      return <Badge variant={"pending"}>{status}</Badge>;
    default:
      return status;
  }
};

const Page: NextPageWithLayout = () => {
  const { data: orders } = useOrdersQuery();
  const { queryParams, searchParams } = useRouterStuff();
  const { data: allOrders } = useAllOrdersQuery();

  const date = searchParams.get("date");

  return (
    <>
      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Here&apos;s a list of the orders!</CardDescription>
          </CardHeader>
          <ExportCSVButton
            csvData={JSON.stringify(allOrders)}
            fileName="orders"
          />
        </div>

        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search ..."
              className="flex-1 h-10 shadow-none border-gray-300"
              onChange={(event) => {
                queryParams({
                  set: {
                    q: event.target.value,
                    _page: "1",
                  },
                });
              }}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[140px] justify-start text-left font-normal h-10 shadow-none border-gray-300",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(new Date(date), "yyyy-MM-dd")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : null}
                  onSelect={(date) => {
                    queryParams({
                      set: {
                        date: date ? date.toISOString() : "",
                        _page: "1",
                      },
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <SwitchGroup
              defaultValue={searchParams.get("status") ?? "all"}
              onValueChange={(value) => {
                queryParams({
                  set: {
                    status: value,
                    _page: "1",
                  },
                });
              }}
            >
              <SwitchGroupItem value="all">All</SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.PENDING}>
                Pending
              </SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.COMPLETED}>
                Completed
              </SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.CANCELED}>
                Canceled
              </SwitchGroupItem>
            </SwitchGroup>
          </div>

          <Separator />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Create At</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.docs.map((order) => {
                return (
                  <TableRow key={order._id}>
                    <TableHead>{order.code}</TableHead>
                    <TableHead>
                      {format(new Date(order.createdAt), "dd MMM yyyy hh:mm")}
                    </TableHead>
                    <TableHead>{order.fullName}</TableHead>
                    <TableHead>{order.phone}</TableHead>
                    <TableHead>{renderStatus(order.status)}</TableHead>
                    <TableHead>{formatPrice(order.orderTotalPrice)}</TableHead>
                    <TableHead>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-label="Open menu"
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                          >
                            <DotsHorizontalIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem asChild>
                            <Link href={`/orders/${order._id}`}>View</Link>
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
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={async () => {
                                      const res = await axiosClient.delete(
                                        `/orders/${order._id}`
                                      );

                                      if (res.status !== 200) {
                                        const error = res.data.message;
                                        toast.error(error);
                                        return;
                                      }

                                      queryClient.invalidateQueries({
                                        queryKey: ["orders"],
                                      });

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
                    </TableHead>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TablePagination tableData={orders} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
