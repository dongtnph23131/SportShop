import axiosClient from "@/lib/axios-instance";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type AnalyticsInventory = {
  totalPriceProductVariants: number;
  totalProductVariants: number;
  totalOutOfStockProductVariants: number;
};

export async function getAnalyticInventory(): Promise<AnalyticsInventory> {
  const response = await axiosClient.get(`/inventory/analytics`);

  return response.data;
}

export type OrdersData = Awaited<ReturnType<typeof getAnalyticInventory>>;

export const useAnalyticsInventoryQuery = <TData = OrdersData>({
  ...options
}: Omit<UseQueryOptions<OrdersData, any, TData>, "queryKey"> = {}) => {
  return useQuery<OrdersData, any, TData>({
    queryKey: ["inventory", "analytics"],
    queryFn: () => getAnalyticInventory(),
    ...options,
  });
};
