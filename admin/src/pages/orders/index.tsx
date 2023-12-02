import { DateRangePicker } from "@/components/date-range-picker";
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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Authorization } from "@/lib/authorization";
import axiosClient from "@/lib/axios-instance";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { queryClient } from "@/lib/react-query";
import { cn, formatPrice } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import { useAllOrdersQuery } from "@/services/orders/all-orders-query";
import { useOrdersQuery } from "@/services/orders/orders-query";
import { useStatisticOrdersQuery } from "@/services/orders/statistic-order-query";

import { Order, OrderStatus, UserRole } from "@/types/base";
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
  const { data: statisticOrders } = useStatisticOrdersQuery();

  console.log(statisticOrders);

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Order</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Canceled
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-6 w-6 bg-red-100 text-red-600 rounded-md p-1 cursor-pointer hover:bg-red-200 hover:text-red-700 transition-colors"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </CardHeader>
          <CardContent>
            {statisticOrders && (
              <>
                <div className="text-2xl font-bold">
                  {statisticOrders?.totalCanceled}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (statisticOrders?.totalCanceled / statisticOrders?.total) *
                    100
                  ).toFixed(2)}
                  % of total orders
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Completed
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-check-square-2 h-6 w6 bg-green-100 text-green-600 rounded-md p-1 cursor-pointer hover:bg-green-200 hover:text-green-700 transition-colors"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </CardHeader>
          <CardContent>
            {statisticOrders && (
              <>
                <div className="text-2xl font-bold">
                  {statisticOrders.totalCompleted}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (statisticOrders?.totalCompleted / statisticOrders?.total) *
                    100
                  ).toFixed(2)}
                  % of total orders
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-package-2 h-6 w6 bg-blue-100 text-blue-600 rounded-md p-1 cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-colors"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
          </CardHeader>

          <CardContent>
            {statisticOrders && (
              <>
                <div className="text-2xl font-bold">
                  {statisticOrders.total}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Here&apos;s a list of the orders!</CardDescription>
          </CardHeader>
          <Authorization allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}>
            <ExportCSVButton
              csvData={JSON.stringify(allOrders)}
              fileName="orders"
            />
          </Authorization>
        </div>

        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search by name, phone, order code"
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
            <DateRangePicker dayCount={30} className="!bg-white" />

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
                          <Authorization
                            allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}
                          >
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
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
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
                          </Authorization>
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
