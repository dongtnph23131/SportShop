import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type StatisticOrder = {
  totalCanceled: number;
  totalCompleted: number;
  total: number;
};

export async function getOrders(): Promise<StatisticOrder> {
  const response = await axiosClient.get(`/orders/statistic`);

  return response.data;
}

export type OrdersData = Awaited<ReturnType<typeof getOrders>>;

export const useStatisticOrdersQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  return useQuery<OrdersData, any, TData>({
    queryKey: ["orders", "statistic"],
    queryFn: () => getOrders(),
    ...options,
  });
};
