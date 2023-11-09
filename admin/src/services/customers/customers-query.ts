import { API_URL } from "@/lib/contants";
import { Customer } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/api/admin/customers`);

  if (!response.ok) throw Error();

  return await response.json();
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
