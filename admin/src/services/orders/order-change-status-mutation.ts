import { API_URL } from "@/lib/contants";
import { OrderStatus } from "@/types/base";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type Input = { id: string; status: OrderStatus };

export async function changeOrderStatus({ id, status }: Input) {
  const response = await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw Error();
  return response;
}

type OrderChangeStatusData = Awaited<ReturnType<typeof changeOrderStatus>>;

export const useProductChangeStatusMutation = ({
  ...options
}: Omit<
  UseMutationOptions<OrderChangeStatusData, any, Input>,
  "mutationFn"
> = {}) => {
  return useMutation<OrderChangeStatusData, any, Input>({
    mutationFn: changeOrderStatus,
    ...options,
  });
};
