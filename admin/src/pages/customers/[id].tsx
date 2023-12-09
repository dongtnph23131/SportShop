import LayoutAdmin from "@/components/layouts";
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
import { NextPageWithLayout } from "@/pages/_app";
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
import { useCustomerQuery } from "@/services/customers/customer-query";
import { format } from "date-fns";
import { OrderStatus } from "@/types/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/utils";
import { CreateGiftCardDialog } from "@/components/customers/create-gift-dialog";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
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

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: customer } = useCustomerQuery({
    id: router.query.id as string,
  });

  return (
    <>
      <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Button>

      {customer ? (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={customer.avatar} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>
                  {customer.firstName + " " + customer.lastName}
                </CardTitle>
                <CardDescription>{customer.email}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Tên:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.firstName}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Họ:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.lastName}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.email}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Ngày tạo:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {format(new Date(customer.createdAt), "dd MMM yyyy")}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Số tiền đã tiêu:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatPrice(
                      customer.orderIds.reduce((acc, curr) => {
                        return acc + curr.orderTotalPrice;
                      }, 0)
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <div className="flex justify-between p-6">
              <CardHeader className="p-0">
                <CardTitle>Thẻ quà tặng</CardTitle>
              </CardHeader>
              <CreateGiftCardDialog customerId={customer._id} />
            </div>

            <CardContent>
              {customer.giftIds.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã quà tặng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày phát hành</TableHead>
                      <TableHead>Giá trị</TableHead>
                      <TableHead>Ngày kết thúc</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.giftIds.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>
                          {item.isDisabled ? (
                            <Badge variant={"secondary"}>Đã Hủy</Badge>
                          ) : (
                            <Badge variant={"success"}>Đang kích hoạt</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(item.createdAt),
                            "dd MMM yyyy hh:mm"
                          )}
                        </TableCell>
                        <TableCell>{formatPrice(item.amountPrice)}</TableCell>
                        <TableCell>
                          {item.endAt
                            ? format(new Date(item.endAt), "dd MMM yyyy hh:mm")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {!item.isDisabled && (
                            <AlertDialog>
                              <AlertDialogTrigger className="text-red-500 hover:underline">
                                Hủy kích hoạt
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
                                      try {
                                        const res = await axiosClient.put(
                                          `/gifts/${item._id}/disable`
                                        );
                                        if (res.status !== 200) {
                                          toast.error(res.data.message);
                                          return;
                                        }
                                        toast.success(
                                          "Disabled gift successfully!"
                                        );
                                        queryClient.invalidateQueries({
                                          queryKey: ["customers", customer._id],
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
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center">
                  <p className="py-4 text-gray-500 italic font-medium text-center">
                    Khách hàng này chưa có quà tặng nào!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Đơn hàng</TableHead>
                    <TableHead>Số lượng sản phẩm</TableHead>
                    <TableHead>Ngày mua</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.orderIds.map((item) => (
                    <TableRow
                      key={item._id}
                      onClick={() => router.push(`/orders/${item._id}`)}
                    >
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.items.length}</TableCell>
                      <TableCell>
                        {format(new Date(item.createdAt), "dd MMM yyyy hh:mm")}
                      </TableCell>
                      <TableCell>
                        {item.status === OrderStatus.CANCELED && (
                          <Badge variant={"destructive"}>{item.status}</Badge>
                        )}
                        {item.status === OrderStatus.PENDING && (
                          <Badge variant={"pending"}>{item.status}</Badge>
                        )}
                        {item.status === OrderStatus.COMPLETED && (
                          <Badge variant={"success"}>{item.status}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatPrice(item.orderTotalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
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
