import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Customer } from "@/types/base";

export function TopCustomers({
  topCustomers,
}: {
  topCustomers?: (Customer & { totalOrderPrice: number })[];
}) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topCustomers?.map((customer) => (
            <div key={customer._id} className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={customer.avatar} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer.email}
                </p>
              </div>
              <div className="ml-auto font-medium">
                +${customer.totalOrderPrice}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
