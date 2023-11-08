import { API_URL } from "@/lib/contants";
import { Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/admin/products`);

  if (!response.ok) throw Error();

  return await response.json();
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
