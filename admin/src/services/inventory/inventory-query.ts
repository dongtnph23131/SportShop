import axiosClient from "@/lib/axios-instance";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import {
  Category,
  Customer,
  Order,
  Pagination,
  Product,
  ProductVariant,
} from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type InventoryResponse = {
  docs: (Omit<ProductVariant, "productId"> & {
    productId: Product;
    category: Category;
    pendingOrders: Order[];
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

  return useQuery<InventoryData, any, TData>({
    queryKey: [
      "inventory",
      searchParams.get("q"),
      searchParams.get("_page"),
      searchParams.get("_limit"),
      searchParams.get("_status"),
    ],
    queryFn: async () => getInventory({ queryString: getQueryString() }),
    ...options,
  });
};
