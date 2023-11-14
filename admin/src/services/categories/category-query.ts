import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Category } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface CategoryInput {
  slug: string;
}

export async function getCategory({ slug }: CategoryInput): Promise<Category> {
  const response = await axiosClient.get(`/categories/${slug}`);

  return response.data;
}

export type ProductData = Awaited<ReturnType<typeof getCategory>>;

export const useCategoryQuery = <TData = ProductData>(
  { slug }: CategoryInput,
  {
    ...options
  }: Omit<UseQueryOptions<ProductData, any, TData>, "queryKey"> = {}
) => {
  return useQuery<ProductData, any, TData>({
    queryKey: ["categories", slug],
    queryFn: () => getCategory({ slug }),
    ...options,
  });
};
