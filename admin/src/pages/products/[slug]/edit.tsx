import LayoutAdmin from "@/components/layouts";
import { UpdateProductForm } from "@/components/products/edit-product-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NextPageWithLayout } from "@/pages/_app";
import { useProductQuery } from "@/services/products/product-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data: product, isFetching } = useProductQuery({ slug });

  return (
    <>
      <Button
        variant="ghost"
        className="items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Button>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Cập nhật sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          {product && !isFetching ? (
            <UpdateProductForm product={product} />
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
