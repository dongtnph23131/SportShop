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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string(),
});

type Inputs = z.infer<typeof formSchema>;

interface EditCollectionFormProps {
  collection: Category;
}

export default function EditCategoryForm({
  collection,
}: EditCollectionFormProps) {
  const router = useRouter();

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
    editCollectionMutation.mutate({
      name: data.name,
      slug: router.query.slug as string,
      description: data.description,
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
