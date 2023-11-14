import axiosClient from "@/lib/axios-instance";
import { Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getProducts(): Promise<Product[]> {
  const response = await axiosClient.get(`/products`);

  return response.data;
}

export type ProductsData = Awaited<ReturnType<typeof getProducts>>;

export const useProductsQuery = <TData = ProductsData>({
  ...options
}: Omit<UseQueryOptions<ProductsData, any, TData>, "queryKey"> = {}) => {
  return useQuery<ProductsData, any, TData>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    ...options,
  });
};
