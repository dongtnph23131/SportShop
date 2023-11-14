import axiosClient from "@/lib/axios-instance";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export async function deleteProduct(body: { id: string }) {
  const response = await axiosClient.delete(`/products/${body.id}`);

  return response.data;
}

type ProjectCreateData = Awaited<ReturnType<typeof deleteProduct>>;

export const useProductDeleteMutation = ({
  ...options
}: Omit<
  UseMutationOptions<ProjectCreateData, any, { id: string }>,
  "mutationFn"
> = {}) => {
  return useMutation<ProjectCreateData, any, { id: string }>({
    mutationFn: deleteProduct,
    ...options,
  });
};
