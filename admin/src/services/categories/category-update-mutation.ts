import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { categoryCreateEditSchema } from "@/lib/validations/category";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type Variables = z.infer<typeof categoryCreateEditSchema>;

export async function updateCategory(body: Variables) {
  const response = await axiosClient.put(`/categories/${body.slug}`, body);

  return response.data;
}

type ProjectUpdateData = Awaited<ReturnType<typeof updateCategory>>;

export const useCategoryUpdateMutation = ({
  ...options
}: Omit<
  UseMutationOptions<ProjectUpdateData, any, Variables>,
  "mutationFn"
> = {}) => {
  return useMutation<ProjectUpdateData, any, Variables>({
    mutationFn: updateCategory,
    ...options,
  });
};
