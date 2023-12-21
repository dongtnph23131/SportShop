import { EditProductVariantDialog } from "@/components/edit-product-variant-dialog";
import { ExportCSVButton } from "@/components/export-button";
import LayoutAdmin from "@/components/layouts";
import { SwitchGroup, SwitchGroupItem } from "@/components/switch-group";
import TablePagination from "@/components/table-pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { formatPrice } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import { useAnalyticsInventoryQuery } from "@/services/inventory/inventory-analytics-query";
import { useInventoryQuery } from "@/services/inventory/inventory-query";
import { BadgeDollarSign, XCircle } from "lucide-react";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  const { queryParams, searchParams } = useRouterStuff();
  const { data: productVariants } = useInventoryQuery();
  const { data: analytics } = useAnalyticsInventoryQuery();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Giá trị kho hàng
            </CardTitle>
            <BadgeDollarSign className="text-blue-600" />
          </CardHeader>
          <CardContent>
            {analytics && (
              <>
                <div className="text-2xl font-bold">
                  {formatPrice(analytics.totalPriceProductVariants)}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số lượng</CardTitle>
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
            {analytics && (
              <>
                <div className="text-2xl font-bold">
                  {analytics.totalProductVariants}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sản phẩm đã hết hàng
            </CardTitle>
            <XCircle className="text-red-500" />
          </CardHeader>

          <CardContent>
            {analytics && (
              <>
                <div className="text-2xl font-bold">
                  {analytics.totalOutOfStockProductVariants}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Kho hàng</CardTitle>
          </CardHeader>
          <div className="flex items-center gap-2">
            <ExportCSVButton
              csvData={JSON.stringify(productVariants?.docs)}
              fileName="inventory"
            />
            <Button asChild>
              <Link href={"/products"}>Xem sản phẩm</Link>
            </Button>
          </div>
        </div>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input
              defaultValue={searchParams.get("q") ?? ""}
              placeholder="Tìm theo tên biến thể sản phẩm..."
              className="w-[150px] lg:w-[250px]"
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
              defaultValue={searchParams.get("_status") ?? "all"}
              value={searchParams.get("_status") ?? "all"}
              onValueChange={(value) => {
                queryParams({
                  set: {
                    _page: "1",
                    _status: value,
                  },
                });
              }}
            >
              <SwitchGroupItem value="all">Tất cả</SwitchGroupItem>
              <SwitchGroupItem value="in-stock">Còn hàng</SwitchGroupItem>
              <SwitchGroupItem value="out-of-stock">Hết hàng</SwitchGroupItem>
              <SwitchGroupItem value="ordered">Đã có khách đặt</SwitchGroupItem>
            </SwitchGroup>
          </div>

          <Separator />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Đã có khách đặt</TableHead>
                <TableHead>Sẵn hàng</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productVariants?.docs.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <Avatar className="h-10 w-10 rounded-sm border border-gray-200">
                        <AvatarImage
                          src={
                            item.image ??
                            "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                          }
                          alt="Avatar"
                        />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href={`/products/${item.productId.slug}`}
                          className="font-semibold hover:underline block w-56 truncate"
                        >
                          {item.productId.name}
                        </Link>
                        <Badge className="inline-block" variant={"secondary"}>
                          {item.options.join(" / ")}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>{item.category.name}</Badge>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>{item.pendingOrders.length}</TableCell>
                  <TableCell>{item.inventory}</TableCell>
                  <TableCell>
                    <EditProductVariantDialog productVariant={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator />

          <TablePagination tableData={productVariants} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
