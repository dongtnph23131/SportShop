import { Category } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch("/api/categories");

  if (!response.ok) throw Error();

  return await response.json();
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
