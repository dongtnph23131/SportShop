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

import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { generateRandomString } from "@/lib/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/router";

export const CreateGiftCardDialog = ({
  customerId,
}: {
  customerId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      {router.query.id ? (
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Tạo mã quà tặng
        </Button>
      ) : (
        <button
          className="flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Tạo mã quà tặng
        </button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo mã giảm giá</DialogTitle>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const code = (e.target as HTMLFormElement)["code"].value;
              const description = (e.target as HTMLFormElement)["desc"].value;
              const amount = (e.target as HTMLFormElement)["amount"].value;
              const endAt = (e.target as HTMLFormElement)["end-at"].value;

              try {
                setIsLoading(true);
                const res = await axiosClient.post(
                  `/customers/${customerId}/gift`,
                  {
                    code,
                    description,
                    amountPrice: amount,
                    endAt,
                  }
                );
                if (res.status !== 200) {
                  toast.error(res.data.message);
                  setIsOpen(false);
                  return;
                }
                toast.success("Created discount successfully!");
                queryClient.invalidateQueries({
                  queryKey: ["customers", customerId],
                });
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
                  Mã giảm giá
                </Label>
                <p
                  className="text-xs text-blue-500 hover:underline cursor-pointer"
                  onClick={() => {
                    (
                      document.getElementById("code") as HTMLInputElement
                    ).value = generateRandomString(10);
                  }}
                >
                  Tạo ngẫu nhiên mã
                </p>
              </div>
              <Input id="code" required />
              <p className={"text-[0.8rem] text-muted-foreground"}>
                Khách hàng phải nhập mã này khi thanh toán.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-right">
                Mô tả
              </Label>
              <Textarea id="desc" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-right">
                Số tiền giảm giá
              </Label>
              <Input id="amount" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-at" className="text-right">
                Ngày giờ kết thúc: (Để trống nếu không muốn giới hạn)
              </Label>
              <Input id="end-at" type="datetime-local" />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
