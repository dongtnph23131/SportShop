import { Gallery } from "@/components/gallery";
import LayoutAdmin from "@/components/layouts";
import ProductReview from "@/components/product-review";
import { UpdateProductForm } from "@/components/products/edit-product-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import { useCommentsByProductQuery } from "@/services/products/comments-query";
import { useProductQuery } from "@/services/products/product-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data: product } = useProductQuery(
    { slug },
    { enabled: Boolean(slug) }
  );

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Button
        variant="ghost"
        className="items-center"
        onClick={() => router.push("/products")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Button>

      <Card className="mt-2">
        <CardContent>
          <div className="flex flex-col rounded-lg bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
            <div className="h-full w-full basis-full lg:basis-3/6">
              <Gallery
                images={
                  product?.images?.map((image) => ({
                    src: image.url,
                    altText: image.name,
                  })) ?? []
                }
              />
            </div>

            <div className="basis-full lg:basis-3/6">
              <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-4xl font-medium">{product?.name}</h1>
              </div>
              {product?.options.map((option) => (
                <dl className="mb-8" key={option._id}>
                  <dt className="mb-4 text-sm uppercase tracking-wide">
                    {option.name}
                  </dt>
                  <dd className="flex flex-wrap gap-3">
                    {option.values.map((value) => {
                      return (
                        <button
                          key={value}
                          className={cn(
                            "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900"
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </dd>
                </dl>
              ))}

              <Separator className="my-4" />

              <dl className="mb-8">
                <dt className="mb-4 text-sm uppercase tracking-wide">
                  Description
                </dt>
                <dd className="flex flex-wrap gap-3 h-40 overflow-y-scroll">
                  {product?.description}
                </dd>
              </dl>

              <Separator className="my-4" />

              <dl className="mb-4 flex gap-2">
                <dt className="uppercase">Display Code:</dt>
                <dd className="flex flex-wrap gap-3 font-medium">
                  <Badge variant={"outline"}>{product.code}</Badge>
                </dd>
              </dl>

              <dl className="mb-4 flex gap-2">
                <dt className="uppercase">Purchases:</dt>
                <dd className="flex flex-wrap gap-3 font-medium">
                  <Badge variant={"outline"}>{product.purchases}</Badge>
                </dd>
              </dl>

              <Separator className="my-4" />

              <Button size={"lg"} asChild>
                <Link href={`/products/${product.slug}/edit`}>
                  Edit product
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductReview productId={product._id} />
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
