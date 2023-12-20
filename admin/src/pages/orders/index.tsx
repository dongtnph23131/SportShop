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

import {
  OrderDeliveryStatus,
  OrderPaymentStatus,
  OrderStatus,
  UserRole,
} from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { Card as CardTremor, Text, Metric } from "@tremor/react";
import { AlertCircle, CircleEllipsis, UserCircleIcon } from "lucide-react";
import { DateSelect } from "@/components/date-select-range-picker";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const renderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return <Badge variant={"destructive"}>Đã Hủy</Badge>;
    case OrderStatus.COMPLETED:
      return <Badge variant={"success"}>Đã hoàn thành</Badge>;
    case OrderStatus.PENDING:
      return <Badge variant={"pending"}>Đang xử lý</Badge>;
    default:
      return status;
  }
};

export const renderDeliveryStatus = (status: OrderDeliveryStatus) => {
  switch (status) {
    case OrderDeliveryStatus.CANCELED:
      return <Badge variant={"destructive"}>Đã Hủy</Badge>;
    case OrderDeliveryStatus.NOT_SHIPPED:
      return <Badge variant={"destructive"}>Chưa giao</Badge>;
    case OrderDeliveryStatus.SHIPPING:
      return <Badge variant={"pending"}>Đang giao</Badge>;
    case OrderDeliveryStatus.SHIPPED:
      return <Badge variant={"success"}>Đã giao</Badge>;
    default:
      return status;
  }
};

export const renderPaymentStatus = (status: OrderPaymentStatus) => {
  switch (status) {
    case OrderPaymentStatus.CANCELED:
      return <Badge variant={"destructive"}>Đã Hủy</Badge>;
    case OrderPaymentStatus.NOT_PAID:
      return <Badge variant={"pending"}>Chưa thanh toán</Badge>;
    case OrderPaymentStatus.PAID:
      return <Badge variant={"success"}>Đã thanh toán</Badge>;

    default:
      return status;
  }
};

const Page: NextPageWithLayout = () => {
  const { data: orders } = useOrdersQuery();
  const { queryParams, searchParams } = useRouterStuff();
  const { data: allOrders } = useAllOrdersQuery();
  const { data: statisticOrders } = useStatisticOrdersQuery();

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Đơn hàng</h2>
        <DateSelect dayCount={30} />
      </div>

      <Authorization allowedRoles={[UserRole.ADMIN]}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng đơn hàng
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
                  <div className="text-3xl font-bold">
                    {statisticOrders.total}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng đơn hàng đang xử lý
              </CardTitle>
              <CircleEllipsis className="lucide lucide-package-2 h-6 w6 bg-yellow-100 text-yellow-600 rounded-md p-1 cursor-pointer hover:bg-yellow-200 hover:text-yellow-700 transition-colors" />
            </CardHeader>

            <CardContent>
              {statisticOrders && (
                <>
                  <div className="text-3xl font-bold">
                    {statisticOrders?.totalPending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {statisticOrders?.total
                      ? (
                          (statisticOrders?.totalPending /
                            statisticOrders?.total) *
                          100
                        ).toFixed(2)
                      : 0}
                    % trên tổng đơn
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng đơn đã hủy
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
                  <div className="text-3xl font-bold">
                    {statisticOrders?.totalCanceled}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {statisticOrders?.total
                      ? (
                          (statisticOrders?.totalCanceled /
                            statisticOrders?.total) *
                          100
                        ).toFixed(2)
                      : 0}
                    % trên tổng đơn
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng đơn đã hoàn thành
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
                  <div className="text-3xl font-bold">
                    {statisticOrders.totalCompleted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {statisticOrders?.total
                      ? (
                          (statisticOrders?.totalCompleted /
                            statisticOrders?.total) *
                          100
                        ).toFixed(2)
                      : 0}
                    % trên tổng đơn
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </Authorization>

      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Danh sách đơn hàng</CardTitle>
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
              defaultValue={searchParams.get("q") ?? ""}
              placeholder="Tìm kiếm theo tên, số điện thoại, mã đơn hàng"
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
              <SwitchGroupItem value="all">Tất cả</SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.PENDING}>
                Đang xử lý
              </SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.COMPLETED}>
                Đã hoàn thành
              </SwitchGroupItem>
              <SwitchGroupItem value={OrderStatus.CANCELED}>
                Đã hủy
              </SwitchGroupItem>
            </SwitchGroup>
          </div>

          <Separator />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Ngày giờ tạo</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <Authorization allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}>
                  <TableHead>Trạng thái thanh toán</TableHead>
                </Authorization>
                <TableHead>Trạng thái giao hàng</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.docs.map((order) => {
                return (
                  <TableRow
                    className={cn(
                      !order.shipperId &&
                        order.deliveryStatus !== OrderDeliveryStatus.SHIPPED &&
                        "bg-yellow-100 hover:bg-yellow-200"
                    )}
                    key={order._id}
                  >
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <span>{order.code}</span>
                        {!order.shipperId &&
                          order.deliveryStatus !==
                            OrderDeliveryStatus.SHIPPED && (
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <AlertCircle className="text-red-500 h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Đơn hàng đang chưa có nhân viên giao hàng</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                      </div>
                    </TableHead>
                    <TableHead>
                      {format(new Date(order.createdAt), "dd MMM yyyy hh:mm")}
                    </TableHead>
                    <TableHead>{order.fullName}</TableHead>
                    <TableHead>{order.phone}</TableHead>
                    <TableHead>{renderStatus(order.status)}</TableHead>
                    <Authorization
                      allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}
                    >
                      <TableHead>
                        {renderPaymentStatus(order.paymentStatus)}
                      </TableHead>
                    </Authorization>
                    <TableHead>
                      {renderDeliveryStatus(order.deliveryStatus)}
                    </TableHead>
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
                            <Link href={`/orders/${order._id}`}>
                              Xem chi tiết
                            </Link>
                          </DropdownMenuItem>
                          <Authorization allowedRoles={[UserRole.ADMIN]}>
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

          {orders?.docs.length === 0 && (
            <div className="mb-12 flex flex-col items-center justify-center py-12">
              <div className="z-10 text-xl font-semibold text-gray-700">
                Không tìm thấy đơn hàng nào
              </div>
              <Image
                alt="No links yet"
                loading="lazy"
                width="400"
                height="400"
                decoding="async"
                data-nimg="1"
                src="https://app.dub.co/_static/illustrations/call-waiting.svg"
              />
            </div>
          )}

          <TablePagination tableData={orders} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
