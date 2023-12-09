import axiosClient from "@/lib/axios-instance";
import { Customer, Gift, Order } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type CustomersResponse = Omit<Customer, "orderIds"> & {
  orderIds: Order[];
};

export async function getCustomers(): Promise<CustomersResponse[]> {
  const response = await axiosClient.get(`/customers`);

  return response.data;
}

export type CustomersData = Awaited<ReturnType<typeof getCustomers>>;

export const useCustomersQuery = <TData = CustomersData>({
  ...options
}: Omit<UseQueryOptions<CustomersData, any, TData>, "queryKey"> = {}) => {
  return useQuery<CustomersData, any, TData>({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    ...options,
  });
};
