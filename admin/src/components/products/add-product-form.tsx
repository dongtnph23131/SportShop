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
// import { FileDialog, FileWithPreview } from "./file-dialog";
// import { Zoom } from "./zoom-image";
// import { generateReactHelpers } from "@uploadthing/react/hooks";
// import { OurFileRouter } from "@/server/uploadthing";
import { useRouter } from "next/router";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { ProductOptions } from "./product-options-section";
import { ProductVariants } from "./product-variants-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductCreateMutation } from "@/services/products/product-create-mutation";
import { toast } from "sonner";
// import { isArrayOfFile } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string(),
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
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.object({ name: z.string(), value: z.string() })),
    })
  ),
});

export type Inputs = z.infer<typeof formSchema> & { images: string[] };

export function AddProductForm() {
  const router = useRouter();
  const createProductMutation = useProductCreateMutation();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      options: [{ name: "", values: [] }],
      collectionId: "6544e045600c0b773f05e11b",
    },
  });

  async function onSubmit(data: Inputs) {
    createProductMutation.mutate(
      {
        name: data.name,
        description: data.description,
        categoryId: data.collectionId,
        options: data.options,
        variants: data.variants.map((item) => ({
          ...item,
          options: item.options.map((option) => option.value),
        })),
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
          <h1 className="font-semibold text-lg">General information</h1>
          <p className="text-sm text-slate-500 mb-4">
            To start selling, all you need is a name and a price.
          </p>

          <div className="space-y-4">
            <FormItem>
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type product description here."
                  {...form.register("description")}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.description?.message}
              />
            </FormItem>

            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Collection</FormLabel>
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
                        {/* {data?.collections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <UncontrolledFormMessage
                    message={form.formState.errors.collectionId?.message}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h1 className="font-semibold text-lg">Variants</h1>
          <p className="text-sm text-slate-500 mb-4">
            Add variations of this product.
          </p>

          <ProductOptions />

          <ProductVariants />
        </div>

        <Separator />

        {/* <div>
          <h1 className="font-semibold text-lg">Image</h1>
          <p className="text-sm text-slate-500 mb-4">
            Add images to this product.
          </p>

          <FormItem className="flex w-full flex-col gap-1.5">
            <FormLabel>Images</FormLabel>
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
                maxFiles={3}
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
        </div> */}

        <Button
          type="submit"
          className="w-fit"
          // disabled={addProductMutation.isLoading}
        >
          {/* {addProductMutation.isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )} */}
          Add Product
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  );
}
