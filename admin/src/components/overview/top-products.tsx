import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Product } from "@/types/base";

export function TopProducts({ topProducts }: { topProducts?: Product[] }) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top selling products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topProducts?.map((product) => (
            <div key={product._id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={product.images[0].url} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Purchases: {product.purchases}
                </p>
              </div>
              {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
