import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type StatisticOrder = {
  totalCanceled: number;
  totalCompleted: number;
  totalPending: number;
  total: number;
};

export async function getOrders({
  queryString,
}: {
  queryString: string;
}): Promise<StatisticOrder> {
  const response = await axiosClient.get(`/orders/statistic${queryString}`);

  return response.data;
}

export type OrdersData = Awaited<ReturnType<typeof getOrders>>;

export const useStatisticOrdersQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  const { getQueryString, searchParams } = useRouterStuff();

  return useQuery<OrdersData, any, TData>({
    queryKey: [
      "orders",
      "statistic",
      searchParams.get("from"),
      searchParams.get("to"),
    ],
    queryFn: () => getOrders({ queryString: getQueryString() }),
    ...options,
  });
};
