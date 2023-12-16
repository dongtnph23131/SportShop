import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { Customer, Order, Product, ProductVariant, User } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface Input {
  id: string;
}

export type OrderResponse = Omit<
  Order,
  "customerId" | "items" | "managerId" | "shipperId"
> & {
  customerId: Customer;
} & {
  items: {
    productId: Product;
    productVariantId: ProductVariant;
    quantity: number;
    productName: string;
    productVariantName: string;
    productVariantPrice: number;
    image: string;
    _id: string;
  }[];
  managerId?: User;
  shipperId?: User;
};

export async function getOrder({ id }: Input): Promise<OrderResponse> {
  const response = await axiosClient.get(`/orders/${id}`);

  return response.data;
}

export type OrderData = Awaited<ReturnType<typeof getOrder>>;

export const useOrderQuery = <TData = OrderData>(
  { id }: Input,
  { ...options }: Omit<UseQueryOptions<OrderData, any, TData>, "queryKey"> = {}
) => {
  return useQuery<OrderData, any, TData>({
    queryKey: ["orders", id],
    queryFn: () => getOrder({ id }),
    ...options,
  });
};
