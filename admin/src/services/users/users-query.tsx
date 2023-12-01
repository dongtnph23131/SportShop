import axiosClient from "@/lib/axios-instance";
import { User } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getUsers(): Promise<User[]> {
  const response = await axiosClient.get(`/user`);

  return response.data;
}

export type ProductsData = Awaited<ReturnType<typeof getUsers>>;

export const useUsersQuery = <TData = ProductsData,>({
  ...options
}: Omit<UseQueryOptions<ProductsData, any, TData>, "queryKey"> = {}) => {
  return useQuery<ProductsData, any, TData>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    ...options,
  });
};
