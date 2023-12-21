import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { FileDialog, FileWithPreview } from "./file-dialog";
import { Zoom } from "./zoom-image";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useRouter } from "next/router";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { ProductOptions } from "./product-options-section";
import { ProductVariants } from "./product-variants-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductCreateMutation } from "@/services/products/product-create-mutation";
import { toast } from "sonner";
import { generateRandomString, isArrayOfFile } from "@/lib/utils";
import { OurFileRouter } from "@/lib/uploadthing";
import { useCategoriesQuery } from "@/services/categories/categories-query";
import slugify from "@sindresorhus/slugify";
import { productStatus } from "@/lib/contants";
import dynamic from "next/dynamic";

const NoSSRDescriptionGenerationAI = dynamic(
  () => import("./description-generation-ai"),
  { ssr: false }
);

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Must be at least 1 character",
    })
    .max(50, { message: "Must be less than 50 characters" })
    .refine(
      (val) => {
        return val.trim().length > 0;
      },
      { message: "Must not be empty" }
    ),
  description: z.string(),
  status: z.string(),
  collectionId: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  productCode: z
    .string()
    .trim()
    .min(1, { message: "Must be at least 1 character" }),
  images: z.unknown(),
  options: z.array(
    z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Must be at least 1 character" }),
      values: z.array(z.string().trim()).min(1, {
        message: "Please add at least one option value",
      }),
    })
  ),
  variants: z
    .array(
      z.object({
        name: z.string().trim(),
        price: z.number().refine((val) => val >= 0, {
          message: "Price must be greater than or equal to 0",
        }),
        inventory: z.number().refine((val) => val >= 0, {
          message: "Inventory must be greater than or equal to 0",
        }),
        options: z.array(z.object({ name: z.string(), value: z.string() })),
        sku: z.string().trim(),
        image: z.string(),
      })
    )
    .min(1, {
      message: "Please add at least one option value",
    }),
});

export type Inputs = z.infer<typeof formSchema> & { images: string[] };

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddProductForm() {
  const router = useRouter();
  const addProductMutation = useProductCreateMutation();
  const [upload, setUpload] = React.useState(false);
  const { data: categories } = useCategoriesQuery();

  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

  const { isUploading, startUpload } = useUploadThing("imageUploader");

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      options: [{ name: "", values: [] }],
      status: "Active",
    },
  });

  async function onSubmit(data: Inputs) {
    setUpload(true);
    const images = isArrayOfFile(data.images)
      ? await startUpload(data.images).then((res) => {
          const formattedImages = res?.map((image) => ({
            id: image.key,
            name: image.key.split("_")[1] ?? image.key,
            url: image.url,
          }));
          return formattedImages ?? null;
        })
      : null;
    setUpload(true);

    addProductMutation.mutate(
      {
        slug: slugify(data.name),
        name: data.name,
        description: data.description,
        productCode: data.productCode,
        categoryId: data.collectionId,
        options: data.options,
        variants: data.variants.map((item) => ({
          ...item,
          options: item.options.map((option) => option.value),
        })),
        images:
          images?.map((image) => ({
            name: image.name,
            url: image.url,
            publicId: image.id,
          })) ?? [],
        status: data.status,
      },
      {
        onSuccess: () => {
          router.push("/products");
          toast.success("Thêm sản phẩm thành công!");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-4xl mx-auto gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <Separator />
        <div>
          <h1 className="font-semibold text-xl">Thông tin chung</h1>
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
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.name?.message}
              />
            </FormItem>

            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Mô tả</FormLabel>
                <NoSSRDescriptionGenerationAI />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Type product description here."
                  rows={5}
                  {...form.register("description")}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.description?.message}
              />
            </FormItem>

            <div className="flex gap-2">
              <FormItem className="flex-1">
                <FormLabel>Mã sản phẩm</FormLabel>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.productCode}
                    placeholder="SP-DSU43ID"
                    {...form.register("productCode")}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.productCode?.message}
                />
              </FormItem>
              <Button
                className="mt-8"
                type="button"
                onClick={() => {
                  form.setValue("productCode", `SP-${generateRandomString()}`);
                  form.clearErrors("productCode");
                }}
              >
                Tạo mã ngẫu nhiên
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
                  <UncontrolledFormMessage
                    message={form.formState.errors.collectionId?.message}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue="Active"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {productStatus.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <UncontrolledFormMessage
                    message={form.formState.errors.status?.message}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h1 className="font-semibold text-lg">Biến thể</h1>
          <p className="text-sm text-slate-500 mb-4">
            Thêm những biến thể cho sản phẩm này.
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
                maxSize={1024 * 1024 * 50}
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
        <Button
          type="submit"
          className="w-fit"
          disabled={addProductMutation.isPending || upload}
        >
          {(addProductMutation.isPending || upload) && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Thêm sản phẩm
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  );
}
