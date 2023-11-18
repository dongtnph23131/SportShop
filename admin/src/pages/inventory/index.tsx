import { EditProductVariantDialog } from "@/components/edit-product-variant-dialog";
import LayoutAdmin from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { NextPageWithLayout } from "@/pages/_app";
import { useInventoryQuery } from "@/services/inventory/inventory-query";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productVariants?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div>
                      <Link
                        href={`/products/${item.productId.slug}`}
                        className="font-semibold hover:underline"
                      >
                        {item.productId.name}
                      </Link>
                      <p>{item.options.join(" / ")}</p>
                    </div>
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
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
