import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getProduct({ slug }: { slug: string }): Promise<Product> {
  const response = await axiosClient.get(`/products/${slug}`);

  return response.data;
}

export type ProductData = Awaited<ReturnType<typeof getProduct>>;

export const useProductQuery = <TData = ProductData>(
  { slug }: { slug: string },
  {
    ...options
  }: Omit<UseQueryOptions<ProductData, any, TData>, "queryKey"> = {}
) => {
  return useQuery<ProductData, any, TData>({
    queryKey: ["products", slug],
    queryFn: () => getProduct({ slug }),
    enabled: !!slug,
    ...options,
  });
};
