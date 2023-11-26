import axiosClient from "@/lib/axios-instance";
import { Comment, Customer } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type CommentResponse = Omit<Comment, "customerId"> & {
  customerId: Customer;
};

export async function getCommentsByProduct({
  slug,
}: {
  slug: string;
}): Promise<CommentResponse[]> {
  const response = await axiosClient.get(`/products/${slug}/review`);

  return response.data;
}

export type ProductData = Awaited<ReturnType<typeof getCommentsByProduct>>;

export const useCommentsByProductQuery = <TData = ProductData>(
  { slug }: { slug: string },
  {
    ...options
  }: Omit<UseQueryOptions<ProductData, any, TData>, "queryKey"> = {}
) => {
  return useQuery<ProductData, any, TData>({
    queryKey: ["products", "comments", slug],
    queryFn: () => getCommentsByProduct({ slug }),
    ...options,
  });
};
