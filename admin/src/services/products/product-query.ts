import { API_URL } from "@/lib/contants";
import { Product } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getProduct({ slug }: { slug: string }): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${slug}`);

  if (!response.ok) throw Error();

  return await response.json();
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
    ...options,
  });
};
