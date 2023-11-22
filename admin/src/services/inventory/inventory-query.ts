import axiosClient from "@/lib/axios-instance";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import {
  Category,
  Customer,
  Pagination,
  Product,
  ProductVariant,
} from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type InventoryResponse = {
  docs: (Omit<ProductVariant, "productId"> & {
    productId: Product;
    category: Category;
  })[];
} & Pagination;

export async function getInventory({
  queryString,
}: {
  queryString: string;
}): Promise<InventoryResponse> {
  const response = await axiosClient.get(`/inventory${queryString}`);

  return response.data;
}

export type InventoryData = Awaited<ReturnType<typeof getInventory>>;

export const useInventoryQuery = <TData = InventoryData>({
  ...options
}: Omit<UseQueryOptions<InventoryData, any, TData>, "queryKey"> = {}) => {
  const { getQueryString, searchParams } = useRouterStuff();

  console.log("getQueryString", getQueryString());

  return useQuery<InventoryData, any, TData>({
    queryKey: [
      "inventory",
      searchParams.get("q"),
      searchParams.get("_page"),
      searchParams.get("_limit"),
    ],
    queryFn: async () => getInventory({ queryString: getQueryString() }),
    ...options,
  });
};
