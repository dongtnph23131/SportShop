import axiosClient from "@/lib/axios-instance";
import { Customer, Product, ProductVariant } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type InventoryResponse = Omit<ProductVariant, "productId"> & {
  productId: Product;
};

export async function getInventory(): Promise<InventoryResponse[]> {
  const response = await axiosClient.get(`/inventory`);

  return response.data;
}

export type InventoryData = Awaited<ReturnType<typeof getInventory>>;

export const useInventoryQuery = <TData = InventoryData>({
  ...options
}: Omit<UseQueryOptions<InventoryData, any, TData>, "queryKey"> = {}) => {
  return useQuery<InventoryData, any, TData>({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
    ...options,
  });
};
