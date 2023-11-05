import { useRouter } from "next/router";
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
import { useCategoryQuery } from "@/services/categories/category-query";
import EditCategoryForm from "@/components/categories/edit-category-form";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data: category } = useCategoryQuery(
    { slug },
    { enabled: Boolean(slug) }
  );

  console.log({ category });

  return (
    <>
      <Button
        variant="ghost"
        className="items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Collections
      </Button>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Edit collection</CardTitle>
        </CardHeader>
        <CardContent>
          {category ? <EditCategoryForm collection={category} /> : "Loading..."}
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
