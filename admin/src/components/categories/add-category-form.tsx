import * as React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Icons } from "@/components/icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryCreateMutation } from "@/services/categories/category-create-mutation";
import { Textarea } from "../ui/textarea";
import { FileDialog, FileWithPreview } from "../products/file-dialog";
import { Zoom } from "../products/zoom-image";
import Image from "next/image";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/lib/uploadthing";
import { isArrayOfFile } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string(),
  images: z.unknown(),
});

type Inputs = z.infer<typeof formSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function AddCategoryForm() {
  const router = useRouter();
  const [upload, setUpload] = React.useState(false);

  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

  const { isUploading, startUpload } = useUploadThing("imageUploader");

  const addCollectionMutation = useCategoryCreateMutation({
    onSuccess: () => {
      router.push("/categories");
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
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
    addCollectionMutation.mutate({
      name: data.name,
      description: data.description,
      image: images?.[0].url ?? "",
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Tên danh mục</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Type collection name here."
              {...form.register("name")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>

        <FormItem>
          <FormLabel>Mô tả</FormLabel>
          <FormControl>
            <Textarea
              aria-invalid={!!form.formState.errors.name}
              {...form.register("description")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>

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

        <Button
          type="submit"
          className="w-fit"
          disabled={addCollectionMutation.isPending || upload}
        >
          {(addCollectionMutation.isPending || upload) && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Thêm danh mục
          <span className="sr-only">Add Collection</span>
        </Button>
      </form>
    </Form>
  );
}
