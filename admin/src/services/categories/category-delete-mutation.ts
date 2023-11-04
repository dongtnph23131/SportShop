import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export async function deleteCategory(body: { id: string }) {
  const response = await fetch(`${API_URL}/api/categories/${body.id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw Error();
  return response;
}

type CategoryDeleteData = Awaited<ReturnType<typeof deleteCategory>>;

export const useCategoryDeleteMutation = ({
  ...options
}: Omit<
  UseMutationOptions<CategoryDeleteData, any, { id: string }>,
  "mutationFn"
> = {}) => {
  return useMutation<CategoryDeleteData, any, { id: string }>({
    mutationFn: deleteCategory,
    ...options,
  });
};
