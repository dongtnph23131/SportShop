import { NextPageWithLayout } from "@/pages/_app";
import LayoutAdmin from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import AddCategoryForm from "@/components/products/add-category-form";

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
        Back to Categories
      </Button>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Add Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
