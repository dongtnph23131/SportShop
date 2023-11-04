import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export async function deleteProduct(body: { id: string }) {
  const response = await fetch(`${API_URL}/api/products/${body.id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw Error();
  return response;
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
