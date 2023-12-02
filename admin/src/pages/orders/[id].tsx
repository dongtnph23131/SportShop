import LayoutAdmin from "@/components/layouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPageWithLayout } from "@/pages/_app";
import {
  OrderDeliveryStatus,
  OrderPaymentStatus,
  OrderStatus,
  UserRole,
} from "@/types/base";
import { format, set } from "date-fns";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import { ArrowLeft, Download, Loader2, Send, Truck } from "lucide-react";
import { useOrderQuery } from "@/services/orders/order-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axios-instance";
import { queryClient } from "@/lib/react-query";
import { formatPrice } from "@/lib/utils";

import { ChooseShipperDialog } from "@/components/create-shipper-dialog";
import { Authorization } from "@/lib/authorization";
import { useState } from "react";
import is from "date-fns/esm/locale/is";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: order } = useOrderQuery({ id: router.query.id as string });
  const [isSendLoading, setIsSendLoading] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to orders
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            onClick={async () => {
              setIsSendLoading(true);
              const res = await axiosClient.get(
                `/orders/${order?._id}/invoice/send-email`
              );

              if (res.status !== 200) {
                const error = res.data.message;
                setIsSendLoading(false);
                toast.error(error);
                return;
              }

              setIsSendLoading(false);

              toast.success("Successfully sent email to customer");
            }}
            disabled={isSendLoading}
          >
            {isSendLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Send Invoice
          </Button>

          <Button
            onClick={async () => {
              const res = await axiosClient.get(
                `/orders/${order?._id}/invoice`,
                {
                  responseType: "blob",
                }
              );

              if (res.status !== 200) {
                const error = res.data.message;
                toast.error(error);
                return;
              }

              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `invoice-${order?.code}.pdf`);
              document.body.appendChild(link);
              link.click();
              link.remove();
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Invoice
          </Button>
        </div>
      </div>

      {order ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Card>
              <div className="flex justify-between p-6">
                <CardHeader className="p-0">
                  <CardTitle>Order information</CardTitle>
                </CardHeader>
                <Authorization allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}>
                  {order.status === OrderStatus.PENDING && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="h-1.5 w-1.5 self-center rounded-full bg-yellow-400"></div>
                        <span className="ml-2 text-sm">Pending</span>
                      </div>
                      <Button
                        variant={"destructive"}
                        onClick={async () => {
                          const res = await axiosClient.post(
                            `/orders/${order._id}/cancel`
                          );

                          if (res.status !== 200) {
                            const error = res.data.message;
                            toast.error(error);
                            return;
                          }

                          toast.success("Successfully canceled this order");
                          queryClient.invalidateQueries({
                            queryKey: ["orders"],
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  {order.status === OrderStatus.COMPLETED && (
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 self-center rounded-full bg-green-400"></div>
                      <span className="ml-2 text-sm">Completed</span>
                    </div>
                  )}
                </Authorization>
              </div>

              <CardContent>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      ID:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.code}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Date:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {format(
                        new Date(order.createdAt),
                        "dd MMM yyyy hh:mm aaaa"
                      )}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Status:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <Badge
                        variant={
                          order.status === OrderStatus.COMPLETED
                            ? "success"
                            : order.status === OrderStatus.CANCELED
                            ? "destructive"
                            : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Amount:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {formatPrice(order.totalPrice)}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Managed by:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.managerId ? (
                        <>
                          {order.managerId.firstName +
                            " " +
                            order.managerId.lastName}
                        </>
                      ) : (
                        "-"
                      )}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.fullName}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.email}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Phone
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.phone}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.address}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Option</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.productId.name}</TableCell>
                      <TableCell>{item.productVariantId.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatPrice(item.productVariantId.price)}
                      </TableCell>
                      <TableCell>
                        {formatPrice(
                          item.productVariantId.price * item.quantity
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="mt-4">
              <div className="flex justify-between p-6">
                <CardHeader className="p-0">
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <Authorization allowedRoles={[UserRole.ADMIN, UserRole.STAFF]}>
                  {order.paymentStatus === OrderPaymentStatus.NOT_PAID && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="h-1.5 w-1.5 self-center rounded-full bg-red-400"></div>
                        <span className="ml-2 text-sm">Not Paid</span>
                      </div>
                      <Button
                        variant={"outline"}
                        onClick={async () => {
                          const res = await axiosClient.post(
                            `/orders/${order._id}/pay`
                          );

                          if (res.status !== 200) {
                            const error = res.data.message;
                            toast.error(error);
                            return;
                          }

                          toast.success("Successfully mask as paid");
                          queryClient.invalidateQueries({
                            queryKey: ["orders"],
                          });
                        }}
                      >
                        Paid
                      </Button>
                    </div>
                  )}
                  {order.paymentStatus === OrderPaymentStatus.PAID && (
                    <div className="flex items-center">
                      <div className="h-1.5 w-1.5 self-center rounded-full bg-green-400"></div>
                      <span className="ml-2 text-sm">Paid</span>
                    </div>
                  )}
                </Authorization>
              </div>
              <CardContent>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <dt className="leading-6 text-gray-900">Subtotal:</dt>
                  <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatPrice(order.totalPrice)}
                  </dd>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <dt className="leading-6 text-gray-900">Discount:</dt>
                  <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatPrice(order.couponPrice)}
                  </dd>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <dt className="leading-6 text-gray-900">Shipping:</dt>
                  <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatPrice(order.shippingPrice)}
                  </dd>
                </div>
                <div className="mt-4 flex items-center justify-between text-lg">
                  <dt className="font-semibold leading-6">Total:</dt>
                  <dd className="font-semibold leading-6 sm:col-span-2 sm:mt-0">
                    {formatPrice(order.orderTotalPrice)}
                  </dd>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex items-center justify-between text-sm mb-4">
                  <dt className="leading-6 text-gray-900">Status:</dt>
                  <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.deliveryStatus === OrderDeliveryStatus.SHIPPED ? (
                      <Badge variant="success">Shipped</Badge>
                    ) : (
                      <Badge variant="default">{order.deliveryStatus}</Badge>
                    )}
                  </dd>
                </div>
                {order.shipperId && (
                  <div className="p-2 border border-gray-400 bg-gray-100 rounded-md">
                    <h1 className="font-semibold text-lg">Shipper:</h1>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <dt className="leading-6 text-gray-900">Name:</dt>
                      <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {order.shipperId.firstName}
                      </dd>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <dt className="leading-6 text-gray-900">Email:</dt>
                      <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {order.shipperId.email}
                      </dd>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <dt className="leading-6 text-gray-900">Phone:</dt>
                      <dd className="leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {order.shipperId.phone}
                      </dd>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4">
                  {!order.shipperId && <ChooseShipperDialog />}
                  {order.deliveryStatus === OrderDeliveryStatus.NOT_SHIPPED && (
                    <Button
                      onClick={async () => {
                        const res = await axiosClient.post(
                          `/orders/${order._id}/ship/status`,
                          { status: OrderDeliveryStatus.SHIPPING }
                        );

                        if (res.status !== 200) {
                          const error = res.data.message;
                          toast.error(error);
                          return;
                        }

                        toast.success("Successfully ship this order");
                        queryClient.invalidateQueries({ queryKey: ["orders"] });
                      }}
                    >
                      Ship
                    </Button>
                  )}
                  {order.deliveryStatus === OrderDeliveryStatus.SHIPPING && (
                    <Button
                      onClick={async () => {
                        const res = await axiosClient.post(
                          `/orders/${order._id}/ship/status`,
                          { status: OrderDeliveryStatus.SHIPPED }
                        );

                        if (res.status !== 200) {
                          const error = res.data.message;
                          toast.error(error);
                          return;
                        }

                        toast.success("Successfully ship this order");
                        queryClient.invalidateQueries({ queryKey: ["orders"] });
                      }}
                    >
                      Mask as delivered
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;

// <Dialog>
//   <DialogTrigger asChild>
//     <Button
//     // onClick={async () => {
//     //   const res = await fetch(
//     //     `${API_URL}/api/admin/orders/${order._id}/pay`,
//     //     { method: "POST" }
//     //   );

//     //   if (!res.ok) {
//     //     const error = await res.text();
//     //     toast.error(error);
//     //     return;
//     //   }

//     //   toast.success("Successfully mask as paid");
//     // }}
//     >
//       Create Delivery
//     </Button>
//   </DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Create delivery</DialogTitle>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="weight" className="text-right">
//           Khối lượng
//         </Label>
//         <Input
//           id="weight"
//           type="number"
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="username" className="text-right">
//           Giao hàng bằng
//         </Label>
//         <Input id="username" className="col-span-3" />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="username" className="text-right">
//           Số tiền thu hộ
//         </Label>
//         <Input id="username" className="col-span-3" />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="username" className="text-right">
//           Ghi chú
//         </Label>
//         <Input id="username" className="col-span-3" />
//       </div>
//     </div>
//     <DialogFooter>
//       <Button type="submit">Giao hàng</Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
