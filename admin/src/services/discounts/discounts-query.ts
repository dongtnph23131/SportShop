import axiosClient from "@/lib/axios-instance";
import { Discount, User } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getDiscounts(): Promise<Discount[]> {
  const response = await axiosClient.get(`/discounts`);

  return response.data;
}

export type ProductsData = Awaited<ReturnType<typeof getDiscounts>>;

export const useDiscountsQuery = <TData = ProductsData>({
  ...options
}: Omit<UseQueryOptions<ProductsData, any, TData>, "queryKey"> = {}) => {
  return useQuery<ProductsData, any, TData>({
    queryKey: ["discounts"],
    queryFn: () => getDiscounts(),
    ...options,
  });
};
