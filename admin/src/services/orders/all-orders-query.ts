import axiosClient from "@/lib/axios-instance";
import { Order } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getOrders(): Promise<Order[]> {
  const response = await axiosClient.get(`/orders/all`);

  return response.data;
}

export type OrdersData = Awaited<ReturnType<typeof getOrders>>;

export const useAllOrdersQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  return useQuery<OrdersData, any, TData>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    ...options,
  });
};
