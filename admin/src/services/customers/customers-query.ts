import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Customer } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getCustomers(): Promise<Customer[]> {
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
