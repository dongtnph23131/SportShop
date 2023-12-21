/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Inputs } from "./add-product-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";

import { AlertCircle, Trash2, UploadCloud } from "lucide-react";
import { CreateProductVariantDialog } from "./create-product-variant-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const ProductVariants = () => {
  const form = useFormContext<Inputs>();
  const [open, setOpen] = useState(false);

  const { fields, append, remove, update } = useFieldArray({
    name: "variants",
    control: form.control,
  });

  form.watch("options");
  form.watch("variants");

  return (
    <div>
      <h3 className="mt-4 font-medium">Biến thể</h3>

      <div className="mt-2">
        <div className="grid grid-cols-[80px_1fr_160px_160px_160px_40px] gap-2">
          <Label>Ảnh</Label>
          <Label>Tên</Label>
          <Label>Giá</Label>
          <Label>Kho</Label>
          <Label>SKU</Label>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className="grid grid-cols-[80px_1fr_160px_160px_160px_40px] gap-2"
            >
              <Controller
                control={form.control}
                name={`variants.${index}.image`}
                render={({ field }) => {
                  return (
                    <div>
                      <label
                        htmlFor={`imgae-${index}`}
                        className="group relative mt-1 flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
                      >
                        <div
                          className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md bg-white transition-all ${
                            field.value
                              ? "opacity-0 group-hover:opacity-100"
                              : "group-hover:bg-gray-50"
                          }`}
                        >
                          <UploadCloud
                            className={`h-5 w-5 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                          />
                        </div>
                        {field.value && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={field.value}
                            alt="Preview"
                            className="h-full w-full rounded-md object-cover"
                          />
                        )}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          id={`imgae-${index}`}
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size / 1024 / 1024 > 50) {
                                toast.error("File size too big (max 50MB)");
                              } else if (
                                file.type !== "image/png" &&
                                file.type !== "image/jpeg"
                              ) {
                                toast.error(
                                  "File type not supported (.png or .jpg only)"
                                );
                              } else {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  field.onChange(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />

              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name={`variants.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Name..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center">
                <FormItem>
                  <FormControl>
                    <Tooltip
                      open={
                        !!form.formState.errors.variants?.[index]?.price
                          ?.message
                      }
                    >
                      <TooltipTrigger asChild>
                        <Input
                          type="number"
                          {...form.register(`variants.${index}.price`, {
                            valueAsNumber: true,
                          })}
                          min={0}
                          className={cn(
                            form.formState.errors.variants?.[index]?.price
                              ?.message &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                          placeholder="Price..."
                        />
                      </TooltipTrigger>
                      <TooltipContent className="mb-2 bg-white border border-gray-200 shadow-md">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <UncontrolledFormMessage
                            message={
                              form.formState.errors.variants?.[index]?.price
                                ?.message
                            }
                          />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </FormControl>
                </FormItem>
              </div>
              <div className="flex items-center">
                <FormItem>
                  <FormControl>
                    <Tooltip
                      open={
                        !!form.formState.errors.variants?.[index]?.inventory
                          ?.message
                      }
                    >
                      <TooltipTrigger asChild>
                        <Input
                          type="number"
                          {...form.register(`variants.${index}.inventory`, {
                            valueAsNumber: true,
                          })}
                          min={0}
                          className={cn(
                            form.formState.errors.variants?.[index]?.inventory
                              ?.message &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                          placeholder="Price..."
                        />
                      </TooltipTrigger>
                      <TooltipContent className="mb-2 bg-white border border-gray-200 shadow-md">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <UncontrolledFormMessage
                            message={
                              form.formState.errors.variants?.[index]?.inventory
                                ?.message
                            }
                          />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="flex items-center">
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...form.register(`variants.${index}.sku`)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className="w-full mt-2"
        disabled={form
          .getValues("options")
          .every((item) => !item.name.length || !item.values.length)}
      >
        Thêm biến thể
      </Button>

      <UncontrolledFormMessage
        className="mt-2 text-center"
        message={form.formState.errors.variants?.message}
      />

      {open && (
        <CreateProductVariantDialog
          open={open}
          setOpen={setOpen}
          append={append}
        />
      )}
    </div>
  );
};
