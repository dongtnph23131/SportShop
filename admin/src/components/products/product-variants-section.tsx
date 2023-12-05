import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Inputs } from "./add-product-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";

import { Trash2 } from "lucide-react";
import { CreateProductVariantDialog } from "./create-product-variant-dialog";

export const ProductVariants = () => {
  const form = useFormContext<Inputs>();
  const [open, setOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control: form.control,
  });

  form.watch("options");
  form.watch("variants");

  return (
    <div>
      <h3 className="mt-4 font-medium">Biến thể</h3>

      <div className="mt-2">
        <div className="grid grid-cols-[1fr_160px_160px_160px_40px] gap-2">
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
              className="grid grid-cols-[1fr_160px_160px_160px_40px] gap-2"
            >
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
                    <Input
                      type="number"
                      {...form.register(`variants.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Price..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="flex items-center">
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      {...form.register(`variants.${index}.inventory`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Price..."
                    />
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
