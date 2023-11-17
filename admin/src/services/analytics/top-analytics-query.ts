import axiosClient from "@/lib/axios-instance";
import { Customer, Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export interface TopAnalytics {
  topProducts: Product[];
  topCustomers: (Customer & { totalOrderPrice: number })[];
}

export async function getTopAnalytics(): Promise<TopAnalytics> {
  const response = await axiosClient.get(`/analytics/top`);

  return response.data;
}

export type AnalyticsData = Awaited<ReturnType<typeof getTopAnalytics>>;

export const useTopAnalyticsQuery = <TData = AnalyticsData>({
  ...options
}: Omit<UseQueryOptions<AnalyticsData, any, TData>, "queryKey"> = {}) => {
  return useQuery<AnalyticsData, any, TData>({
    queryKey: ["analytics", "top"],
    queryFn: () => getTopAnalytics(),
    ...options,
  });
};
