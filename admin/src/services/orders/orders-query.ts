import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { Order, Pagination } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type InventoryResponse = {
  docs: Order[];
} & Pagination;

export async function getOrders({
  queryString,
}: {
  queryString: string;
}): Promise<InventoryResponse> {
  const response = await axiosClient.get(`/orders${queryString}`);

  return response.data;
}

export type OrdersData = Awaited<ReturnType<typeof getOrders>>;

export const useOrdersQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  const { getQueryString, searchParams } = useRouterStuff();

  return useQuery<OrdersData, any, TData>({
    queryKey: [
      "orders",
      searchParams.get("q"),
      searchParams.get("_page"),
      searchParams.get("_limit"),
      searchParams.get("status"),
      searchParams.get("from"),
      searchParams.get("to"),
    ],
    queryFn: () => getOrders({ queryString: getQueryString() }),
    ...options,
  });
};
