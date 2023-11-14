import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type CategoryCreateVariables = { name: string };

export async function createCategory(body: CategoryCreateVariables) {
  const response = await axiosClient.post(`/categories`, body);

  return response.data;
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
