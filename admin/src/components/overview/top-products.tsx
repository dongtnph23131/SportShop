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
        <CardTitle>Danh sách sản phẩm bán chạy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topProducts?.map((product) => (
            <div key={product._id} className="flex items-center">
              <Avatar className="h-10 w-10 rounded-sm border border-gray-200">
                <AvatarImage
                  src={
                    product.images?.[0]?.url ??
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                  }
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Lượt mua hàng: {product.purchases}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
