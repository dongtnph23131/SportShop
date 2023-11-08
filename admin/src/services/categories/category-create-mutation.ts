import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type CategoryCreateVariables = { name: string };

export async function createCategory(body: CategoryCreateVariables) {
  const response = await fetch(`${API_URL}/api/admin/categories`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw Error();
  return response;
}

type CategoryCreateData = Awaited<ReturnType<typeof createCategory>>;

export const useCategoryCreateMutation = ({
  ...options
}: Omit<
  UseMutationOptions<CategoryCreateData, any, CategoryCreateVariables>,
  "mutationFn"
> = {}) => {
  return useMutation<CategoryCreateData, any, CategoryCreateVariables>({
    mutationFn: createCategory,
    ...options,
  });
};
