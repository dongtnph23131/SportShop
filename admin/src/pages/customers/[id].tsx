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

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: customer } = useCustomerQuery({
    id: router.query.id as string,
  });

  return (
    <>
      <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to customers
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
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    First Name:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.firstName}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Last Name:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.lastName}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.email}
                  </dd>
                </div>
              </dl>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Created At:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {format(new Date(customer.createdAt), "dd MMM yyyy")}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>An overview of Customer Orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
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
                      <TableCell>{item.totalPrice}</TableCell>
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
