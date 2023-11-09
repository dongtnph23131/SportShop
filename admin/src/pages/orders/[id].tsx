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
  CardFooter,
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
import { queryClient } from "@/lib/react-query";
import { NextPageWithLayout } from "@/pages/_app";
import { useOrdersQuery } from "@/services/orders/orders-query";
import { useProductDeleteMutation } from "@/services/products/product-delete-mutation";
import { Order, OrderStatus, Product } from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { useOrderQuery } from "@/services/orders/order-query";
import { useProductChangeStatusMutation } from "@/services/orders/order-change-status-mutation";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: order } = useOrderQuery({ id: router.query.id as string });
  const { mutate } = useProductChangeStatusMutation();

  return (
    <>
      <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to orders
      </Button>

      {order ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Order information</CardTitle>
              </CardHeader>

              <CardContent>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      ID:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order._id}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Date:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {format(new Date(order.createdAt), "dd MMM yyyy")}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Status:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <Badge>{order.status}</Badge>
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Amount:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {order.totalPrice}
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
                      <TableCell>{item.productVariantId.price}</TableCell>
                      <TableCell>
                        {item.productVariantId.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl border border-gray-300 rounded-md p-4">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium leading-6 text-gray-900">
                    Subtotal:
                  </dt>
                  <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.totalPrice}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium leading-6 text-gray-900">
                    Discount:
                  </dt>
                  <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.couponPrice}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium leading-6 text-gray-900">
                    Shipping:
                  </dt>
                  <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.shippingPrice}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium leading-6 text-gray-900">
                    Total:
                  </dt>
                  <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.totalPrice - order.couponPrice - order.shippingPrice}
                  </dd>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 items-center">
              <Button
                variant="destructive"
                onClick={() =>
                  mutate(
                    { id: order._id, status: OrderStatus.CANCELED },
                    {
                      onSuccess: () => {
                        router.push("/orders");
                      },
                    }
                  )
                }
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  mutate(
                    { id: order._id, status: OrderStatus.CONFIRMED },
                    {
                      onSuccess: () => {
                        router.push("/orders");
                      },
                    }
                  )
                }
              >
                Confirm
              </Button>
              <Button
                onClick={() =>
                  mutate(
                    { id: order._id, status: OrderStatus.COMPLETED },
                    {
                      onSuccess: () => {
                        router.push("/orders");
                      },
                    }
                  )
                }
              >
                Complete
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
