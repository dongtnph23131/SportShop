import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface CategoryVariables {
  slug: string;
}

export async function deleteCategory(body: CategoryVariables) {
  const response = await fetch(`${API_URL}/api/admin/categories/${body.slug}`, {
    method: "DELETE",
  });

  if (!response.ok) throw Error();
  return response;
}

type CategoryDeleteData = Awaited<ReturnType<typeof deleteCategory>>;

export const useCategoryDeleteMutation = ({
  ...options
}: Omit<
  UseMutationOptions<CategoryDeleteData, any, CategoryVariables>,
  "mutationFn"
> = {}) => {
  return useMutation<CategoryDeleteData, any, CategoryVariables>({
    mutationFn: deleteCategory,
    ...options,
  });
};
