import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { productUpdateBodySchema } from "@/lib/validations/product";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type ProductUpdateVariables = z.infer<typeof productUpdateBodySchema>;

export async function updateProduct(body: ProductUpdateVariables) {
  const response = await axiosClient.put(`/products/${body.id}`, body);

  return response.data;
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
