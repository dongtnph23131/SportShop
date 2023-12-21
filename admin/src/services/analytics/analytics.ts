import axiosClient from "@/lib/axios-instance";
import { getQueryString } from "@/lib/utils";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export interface DailyAnalytics {
  _id: string;
  total: number;
}

export interface SaleAnalytics {
  total: number;
  daily: DailyAnalytics[];
}

export interface OrderAnalytics {
  total: number;
  daily: DailyAnalytics[];
}

export interface Analytics {
  sale: SaleAnalytics;
  orders: OrderAnalytics;
  customers: number;
}

export interface QueryParams {
  from: string | null;
  to: string | null;
}

export async function getAnalytics({
  from,
  to,
}: QueryParams): Promise<Analytics> {
  const response = await axiosClient.get(
    `/analytics${getQueryString({ ...(from && { from }), ...(to && { to }) })}`
  );

  return response.data;
}

export type AnalyticsData = Awaited<ReturnType<typeof getAnalytics>>;

export const useAnalyticsQuery = <TData = AnalyticsData>({
  from,
  to,
  ...options
}: Omit<UseQueryOptions<AnalyticsData, any, TData>, "queryKey"> & {
  from: string | null;
  to: string | null;
}) => {
  return useQuery<AnalyticsData, any, TData>({
    queryKey: ["analytics", from, to],
    queryFn: () => getAnalytics({ from, to }),
    ...options,
  });
};
