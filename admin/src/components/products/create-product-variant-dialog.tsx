import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import {
  UseFieldArrayAppend,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Inputs } from "./add-product-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateProductVariantDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  append: UseFieldArrayAppend<Inputs, "variants">;
}

export const CreateProductVariantDialog = ({
  open,
  setOpen,
  append,
}: CreateProductVariantDialogProps) => {
  const addProductForm = useFormContext<Inputs>();
  const [formState, setFormState] = useState({
    name: "",
    price: 0,
    inventory: 0,
    options: addProductForm
      .getValues("options")
      .map((item) => ({ name: item.name, value: "" })),
  });

  console.log({ formState });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Variant</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Black / XL"
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Options</h3>

          <div className="gap-4 grid grid-cols-2">
            {addProductForm
              .getValues("options")
              .filter((item) => item.name.length > 0 && item.values.length > 0)
              .map((item, index) => {
                return (
                  <FormItem key={index} className="w-full">
                    <FormLabel>{item.name}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            options: prev.options.map((option) => {
                              if (item.name === option.name) {
                                return {
                                  ...option,
                                  value,
                                };
                              }

                              return option;
                            }),
                          }))
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {item.values.map((value, index) => (
                            <SelectItem key={index} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormItem className="w-full">
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type product price here."
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>Inventory</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type product inventory here."
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    inventory: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </FormItem>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              append(formState);
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
