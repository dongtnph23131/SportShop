import { API_URL } from "@/lib/contants";
import { categoryCreateEditSchema } from "@/lib/validations/category";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type Variables = z.infer<typeof categoryCreateEditSchema>;

export async function updateCategory(body: Variables) {
  const response = await fetch(`${API_URL}/api/admin/categories/${body.slug}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw Error();
  return response;
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
