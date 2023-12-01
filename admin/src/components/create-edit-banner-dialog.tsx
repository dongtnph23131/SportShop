import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { toast } from "sonner";
import axiosClient from "@/lib/axios-instance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { queryClient } from "@/lib/react-query";
import { Loader2 } from "lucide-react";
import { Banner, BannerStatus } from "@/types/base";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  status: z.enum([BannerStatus.ACTIVE, BannerStatus.INACTIVE]),
  image: z.unknown(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function CreateEditBannerDialog({ banner }: { banner?: Banner }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: banner ? banner.name : "",
      status: banner ? banner.status : BannerStatus.ACTIVE,
      image: banner ? banner.image : "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    if (banner) {
      const res = await axiosClient.put(`/banners/${banner._id}`, data);
      if (res.status === 200) {
        toast.success("Successfully updated banner");
        queryClient.invalidateQueries({ queryKey: ["banners"] });
        setOpen(false);
      } else {
        toast.error("Something went wrong");
        setOpen(false);
      }
    } else {
      const res = await axiosClient.post("/banners", data);
      if (res.status === 200) {
        toast.success("Successfully created banner");
        queryClient.invalidateQueries({ queryKey: ["banners"] });
        setOpen(false);
      } else {
        toast.error("Something went wrong");
        setOpen(false);
      }
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            banner &&
              "w-full text-left hover:bg-gray-100 cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          )}
          variant={banner ? "ghost" : "default"}
        >
          {banner ? "Edit" : "Create Banner"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{banner ? "Edit Banner" : "Create Banner"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
                        <SelectItem value={BannerStatus.ACTIVE}>
                          {BannerStatus.ACTIVE}
                        </SelectItem>
                        <SelectItem value={BannerStatus.INACTIVE}>
                          {BannerStatus.INACTIVE}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size / 1024 / 1024 > 50) {
                      toast.error("File size too big (max 50MB)");
                    } else if (
                      file.type !== "image/png" &&
                      file.type !== "image/jpeg"
                    ) {
                      toast.error("File type not supported (.ng or .jpg only)");
                    } else {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        form.setValue("image", e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {banner ? "Update" : "Create"} Banner
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
