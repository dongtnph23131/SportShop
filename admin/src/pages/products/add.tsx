import { AddProductForm } from "@/components/products/add-product-form";
import LayoutAdmin from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NextPageWithLayout } from "@/pages/_app";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="ghost"
        className="items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Button>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Add product</CardTitle>
          <CardDescription>Add a new product to your store</CardDescription>
        </CardHeader>

        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
