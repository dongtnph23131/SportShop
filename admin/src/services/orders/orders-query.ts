import { API_URL } from "@/lib/contants";
import { Order } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/api/admin/orders`);

  if (!response.ok) throw Error();

  return await response.json();
}

export type OrdersData = Awaited<ReturnType<typeof getOrders>>;

export const useOrdersQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  return useQuery<OrdersData, any, TData>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    ...options,
  });
};
