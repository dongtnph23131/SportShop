import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { Discount, DiscountType } from "@/types/base";
import { generateRandomString } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

export const EditDiscountDialog = ({ discount }: { discount: Discount }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="font-semibold cursor-pointer text-blue-600 hover:underline">
          Edit
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Discount</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const code = (e.target as HTMLFormElement)["code"].value;
            const description = (e.target as HTMLFormElement)["desc"].value;
            const count = (e.target as HTMLFormElement)["count"].value;
            const type = (e.target as HTMLFormElement)["type"].value;
            const amount = (e.target as HTMLFormElement)["amount"].value;
            const startAt = (e.target as HTMLFormElement)["start-at"].value;
            const endAt = (e.target as HTMLFormElement)["end-at"].value;

            try {
              setIsLoading(true);
              const res = await axiosClient.put(`/discounts/${discount._id}`, {
                code,
                description,
                count,
                type,
                amount,
                startAt,
                endAt,
              });
              if (res.status !== 200) {
                toast.error(res.data.message);
                setIsOpen(false);
                return;
              }
              toast.success("Created discount successfully!");
              queryClient.invalidateQueries({ queryKey: ["discounts"] });
              setIsOpen(false);
            } catch (error) {
              toast.error("Something went wrong!");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="code" className="text-right">
                Discount code
              </Label>
              <p
                className="text-xs text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  (document.getElementById("code") as HTMLInputElement).value =
                    generateRandomString(10);
                }}
              >
                Generate random code
              </p>
            </div>
            <Input id="code" defaultValue={discount.code} required />
            <p className={"text-[0.8rem] text-muted-foreground"}>
              Customers must enter this code at checkout.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Textarea id="desc" defaultValue={discount.description} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count" className="text-right">
              Count
            </Label>
            <Input
              id="count"
              type="number"
              defaultValue={discount.usageCount}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <select
                id="type"
                defaultValue={discount.type}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={DiscountType.PERCENTAGE}>
                  {DiscountType.PERCENTAGE}
                </option>
                <option value={DiscountType.FIXED_AMOUNT}>
                  {DiscountType.FIXED_AMOUNT}
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                defaultValue={
                  discount.type === DiscountType.FIXED_AMOUNT
                    ? discount.amountPrice
                    : discount.percentage
                }
                required
                type="number"
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-at" className="text-right">
              Start At:
            </Label>
            <Input
              id="start-at"
              defaultValue={new Date(discount.startAt)
                .toISOString()
                .slice(0, -1)}
              required
              type="datetime-local"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-at" className="text-right">
              End At:
            </Label>
            <Input
              defaultValue={
                discount.endAt
                  ? new Date(discount.endAt).toISOString().slice(0, -1)
                  : undefined
              }
              id="end-at"
              type="datetime-local"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
