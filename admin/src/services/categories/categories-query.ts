import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Category } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getCategories(): Promise<Category[]> {
  const response = await axiosClient.get(`/categories`);

  return response.data;
}

export type CategoriesData = Awaited<ReturnType<typeof getCategories>>;

export const useCategoriesQuery = <TData = CategoriesData>({
  ...options
}: Omit<UseQueryOptions<CategoriesData, any, TData>, "queryKey"> = {}) => {
  return useQuery<CategoriesData, any, TData>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    ...options,
  });
};
