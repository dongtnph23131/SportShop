import { API_URL } from "@/lib/contants";
import { productUpdateBodySchema } from "@/lib/validations/product";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type ProductUpdateVariables = z.infer<typeof productUpdateBodySchema>;

export async function updateProduct(body: ProductUpdateVariables) {
  const response = await fetch(`${API_URL}/api/admin/products/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw Error();
  return response;
}

type ProjectUpdateData = Awaited<ReturnType<typeof updateProduct>>;

export const useProductUpdateMutation = ({
  ...options
}: Omit<
  UseMutationOptions<ProjectUpdateData, any, ProductUpdateVariables>,
  "mutationFn"
> = {}) => {
  return useMutation<ProjectUpdateData, any, ProductUpdateVariables>({
    mutationFn: updateProduct,
    ...options,
  });
};
