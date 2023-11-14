import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface CategoryVariables {
  slug: string;
}

export async function deleteCategory(body: CategoryVariables) {
  const response = await axiosClient.delete(`/categories/${body.slug}`);

  return response.data;
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
