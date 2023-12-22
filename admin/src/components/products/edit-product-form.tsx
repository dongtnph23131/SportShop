import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  UploadButton,
  UploadDropzone,
  generateRandomString,
  isArrayOfFile,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { FileDialog, FileWithPreview } from "./file-dialog";
import { z } from "zod";
import { Zoom } from "./zoom-image";
import { Separator } from "@/components/ui/separator";
import { ProductOptions } from "./product-options-section";
import { ProductVariants } from "./product-variants-section";
import { OurFileRouter } from "@/lib/uploadthing";
import { Product } from "@/types/base";
import { useCategoriesQuery } from "@/services/categories/categories-query";
import { useProductUpdateMutation } from "@/services/products/product-update-mutation";
import slugify from "@sindresorhus/slugify";
import DescriptionGenerationAI from "./description-generation-ai";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string(),
  productCode: z.string().min(1, { message: "Must be at least 1 character" }),
  collectionId: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  images: z.unknown(),
  options: z.array(
    z.object({
      name: z.string().min(1, { message: "Must be at least 1 character" }),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      sku: z.string(),
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.string()),
      image: z.string(),
    })
  ),
});

type Inputs = z.infer<typeof formSchema>;

interface UpdateProductFormProps {
  product: Product;
}

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const router = useRouter();
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
  const [upload, setUpload] = React.useState(false);
  const updateProductMutation = useProductUpdateMutation({
    onSuccess: () => {
      router.push("/products");
    },
  });

  const { data: categories } = useCategoriesQuery();

  React.useEffect(() => {
    if (product.images && product.images.length > 0) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
          });
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          });

          return fileWithPreview;
        })
      );
    }
  }, [product]);

  const { isUploading, startUpload } = useUploadThing("imageUploader");

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionId: product.categoryId?._id,
      options: product.options.map((option) => ({
        name: option.name,
        values: option.values,
      })),
      images: product.images,
      productCode: product.code,
      variants: product.productVariantIds.map((variant) => ({
        id: variant._id,
        sku: variant.sku,
        name: variant.name,
        price: variant.price,
        inventory: variant.inventory,
        options: variant.options,
        image: variant.image,
      })),
    },
  });

  async function onSubmit(data: Inputs) {
    const newFiles =
      files?.filter(
        (file) =>
          product.images?.find((image) => image.name === file.name) ===
          undefined
      ) ?? [];

    setUpload(true);
    const images = isArrayOfFile(newFiles)
      ? await startUpload(newFiles).then((res) => {
          const formattedImages = res?.map((image) => ({
            publicId: image.key,
            name: image.key.split("_")[1] ?? image.key,
            url: image.url,
          }));
          return formattedImages ?? null;
        })
      : null;

    setUpload(false);

    updateProductMutation.mutate({
      id: product._id,
      slug: slugify(data.name),
      name: data.name,
      description: data.description,
      productCode: data.productCode,
      categoryId: data.collectionId,
      images:
        newFiles.length > 0 && images
          ? [
              ...product.images.map((item) => ({
                publicId: item.publicId,
                name: item.name,
                url: item.url,
              })),
              ...images,
            ].map((image) => ({
              name: image.name,
              url: image.url,
              publicId: image.publicId,
            }))
          : product.images,
      options: data.options,
      variants: data.variants,
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-4xl mx-auto gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <Separator />

        <div>
          <h1 className="font-semibold text-lg">Thông tin chung</h1>
          <p className="text-sm text-slate-500 mb-4">
            Để bắt đầu bán hàng, tất cả những gì bạn cần là tên và giá.
          </p>

          <div className="space-y-4">
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input
                  aria-invalid={!!form.formState.errors.name}
                  placeholder="Type product name here."
                  {...form.register("name")}
                  defaultValue={product.name}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.name?.message}
              />
            </FormItem>

            <FormItem>
              <div className="flex items-center gap-1">
                <FormLabel>Mô tả</FormLabel>
                <DescriptionGenerationAI />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Type product description here."
                  rows={5}
                  {...form.register("description")}
                  defaultValue={product.description ?? ""}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.description?.message}
              />
            </FormItem>

            <div className="flex items-end gap-2">
              <FormItem className="flex-1">
                <FormLabel>Mã sản phẩm</FormLabel>
                <FormControl>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.productCode}
                      placeholder="SP-DSU43ID"
                      {...form.register("productCode")}
                    />
                  </FormControl>
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.description?.message}
                />
              </FormItem>
              <Button
                type="button"
                onClick={() => {
                  form.setValue("productCode", `SP-${generateRandomString()}`);
                }}
              >
                Tạo ngẫu nhiên
              </Button>
            </div>

            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value: typeof field.value) =>
                        field.onChange(value)
                      }
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((collection) => (
                          <SelectItem
                            key={collection._id}
                            value={collection._id}
                          >
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h1 className="font-semibold text-lg">Biến thể</h1>
          <p className="text-sm text-slate-500 mb-4">
            Thêm biến thể cho sản phẩm này.
          </p>

          <ProductOptions />

          <ProductVariants />
        </div>

        <Separator />

        <div>
          <h1 className="font-semibold text-lg">Ảnh</h1>
          <p className="text-sm text-slate-500 mb-4">
            Thêm ảnh cho sản phẩm này.
          </p>
          <FormItem className="flex w-full flex-col gap-1.5">
            <FormLabel>Ảnh</FormLabel>
            {files?.length ? (
              <div className="flex items-center gap-2">
                {files.map((file, i) => (
                  <Zoom key={i}>
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                      width={80}
                      height={80}
                    />
                  </Zoom>
                ))}
              </div>
            ) : null}
            <FormControl>
              <FileDialog
                setValue={form.setValue}
                name="images"
                maxFiles={5}
                maxSize={1024 * 1024 * 4}
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.images?.message}
            />
          </FormItem>
        </div>

        <Button disabled={updateProductMutation.isPending || upload}>
          {(updateProductMutation.isPending || upload) && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Cập nhật sản phẩm
          <span className="sr-only">Update product</span>
        </Button>
      </form>
    </Form>
  );
}
