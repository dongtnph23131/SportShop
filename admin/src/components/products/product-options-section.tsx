import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Inputs } from "./add-product-form";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export const ProductOptions = () => {
  const form = useFormContext<Inputs>();

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });

  form.watch("options");

  return (
    <div>
      <h3 className="mt-4 font-medium">Tùy chọn</h3>

      <div className="mt-2">
        <div className="grid grid-cols-[230px_1fr_40px] gap-2">
          <Label>Tên</Label>
          <Label>Giá trị (Ngăn cách bằng dấu phẩy)</Label>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="grid grid-cols-[230px_1fr_40px] gap-2"
              >
                <FormField
                  control={form.control}
                  name={`options.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Size..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`options.${index}.values`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          defaultValue={field.value.join(", ")}
                          placeholder="S, M, L,..."
                          onChange={(e) => {
                            const val = e.target.value;

                            if (val.length > 0) {
                              field.onChange(
                                val.split(",").map((item) => item.trim())
                              );
                            } else {
                              field.onChange([]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ name: "", values: [] })}
      >
        Add an option
      </Button>
    </div>
  );
};
