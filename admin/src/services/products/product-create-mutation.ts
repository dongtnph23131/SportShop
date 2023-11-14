import axiosClient from "@/lib/axios-instance";
import { API_URL } from "@/lib/contants";
import { productCreateBodySchema } from "@/lib/validations/product";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type ProductCreateVariables = z.infer<typeof productCreateBodySchema>;

export async function createProduct(body: ProductCreateVariables) {
  const response = await axiosClient.post(`/products`, body);

  return response.data;
}

type ProjectCreateData = Awaited<ReturnType<typeof createProduct>>;

export const useProductCreateMutation = ({
  ...options
}: Omit<
  UseMutationOptions<ProjectCreateData, any, ProductCreateVariables>,
  "mutationFn"
> = {}) => {
  return useMutation<ProjectCreateData, any, ProductCreateVariables>({
    mutationFn: createProduct,
    ...options,
  });
};
