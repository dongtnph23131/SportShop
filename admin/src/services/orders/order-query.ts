import { API_URL } from "@/lib/contants";
import { Customer, Order, Product, ProductVariant } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface Input {
  id: string;
}

export type OrderResponse = Order & { customerId: Customer } & {
  items: {
    productId: Product;
    productVariantId: ProductVariant;
    quantity: number;
    _id: string;
  }[];
};

export async function getOrder({ id }: Input): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/api/admin/orders/${id}`);

  if (!response.ok) throw Error();

  return await response.json();
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
