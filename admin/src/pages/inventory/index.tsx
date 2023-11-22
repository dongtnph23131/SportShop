import { EditProductVariantDialog } from "@/components/edit-product-variant-dialog";
import LayoutAdmin from "@/components/layouts";
import TablePagination from "@/components/table-pagination";
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
import { NextPageWithLayout } from "@/pages/_app";
import { useInventoryQuery } from "@/services/inventory/inventory-query";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  const { queryParams, searchParams } = useRouterStuff();
  const { data: productVariants } = useInventoryQuery();

  return (
    <>
      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Here&apos;s a list of inventory!</CardDescription>
          </CardHeader>
          <Button asChild>
            <Link href={"/products"}>View products</Link>
          </Button>
        </div>
        <CardContent>
          <Input
            placeholder="Search by product variant name..."
            className="h-8 w-[150px] lg:w-[250px] mb-4"
            onChange={(event) => {
              queryParams({
                set: {
                  q: event.target.value,
                  _page: "1",
                },
              });
            }}
          />

          <Separator />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productVariants?.docs.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>{item.category.name}</Badge>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.price}</TableCell>
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
