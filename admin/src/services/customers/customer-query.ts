import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Customer, Order, Product, ProductVariant } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface Input {
  id: string;
}

export type CustomerResponse = Omit<Customer, "orderIds"> & {
  orderIds: Order[];
};

export async function getCustomer({ id }: Input): Promise<CustomerResponse> {
  const response = await axiosClient.get(`/customers/${id}`);

  return response.data;
}

export type CustomerData = Awaited<ReturnType<typeof getCustomer>>;

export const useCustomerQuery = <TData = CustomerData>(
  { id }: Input,
  {
    ...options
  }: Omit<UseQueryOptions<CustomerData, any, TData>, "queryKey"> = {}
) => {
  return useQuery<CustomerData, any, TData>({
    queryKey: ["customers", id],
    queryFn: () => getCustomer({ id }),
    ...options,
  });
};
