import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/router";

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
import { useCategoryUpdateMutation } from "@/services/categories/category-update-mutation";
import { Category } from "@/types/base";
import { Textarea } from "../ui/textarea";
import { FileDialog, FileWithPreview } from "../products/file-dialog";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/lib/uploadthing";
import { isArrayOfFile } from "@/lib/utils";
import { Zoom } from "../products/zoom-image";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string(),
  images: z.unknown(),
});

type Inputs = z.infer<typeof formSchema>;

interface EditCollectionFormProps {
  collection: Category;
}

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function EditCategoryForm({
  collection,
}: EditCollectionFormProps) {
  const router = useRouter();
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
  const [upload, setUpload] = React.useState(false);

  const { isUploading, startUpload } = useUploadThing("imageUploader");

  React.useEffect(() => {
    if (collection.image) {
      setFiles([
        Object.assign(
          new File([], collection.image, {
            type: "image",
          }),
          {
            preview: collection.image,
          }
        ),
      ]);
    }
  }, [collection.image]);

  const editCollectionMutation = useCategoryUpdateMutation({
    onSuccess: () => {
      router.push("/categories");
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: collection.name,
      description: collection.description,
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
    setUpload(false);

    editCollectionMutation.mutate({
      name: data.name,
      slug: router.query.slug as string,
      description: data.description,
      image: images?.[0].url ?? collection.image,
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
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
          <FormLabel>Description</FormLabel>
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
          <FormLabel>Image</FormLabel>
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
          disabled={editCollectionMutation.isPending}
        >
          {editCollectionMutation.isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Edit Collection
          <span className="sr-only">Edit Collection</span>
        </Button>
      </form>
    </Form>
  );
}
