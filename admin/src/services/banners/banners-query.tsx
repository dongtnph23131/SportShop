import axiosClient from "@/lib/axios-instance";
import { Banner, Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getBanners(): Promise<Banner[]> {
  const response = await axiosClient.get(`/banners`);

  return response.data;
}

export type ProductsData = Awaited<ReturnType<typeof getBanners>>;

export const useBannersQuery = <TData = ProductsData,>({
  ...options
}: Omit<UseQueryOptions<ProductsData, any, TData>, "queryKey"> = {}) => {
  return useQuery<ProductsData, any, TData>({
    queryKey: ["banners"],
    queryFn: () => getBanners(),
    ...options,
  });
};
