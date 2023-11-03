import { API_URL } from "@/lib/contants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type ProductCreateVariables = {
  name: string;
  description: string;
  categoryId: string;
  options: { name: string; values: string[] }[];
  variants: {
    name: string;
    price: number;
    inventory: number;
    options: string[];
  }[];
};

export async function createProduct(body: ProductCreateVariables) {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw Error();
  return response;
}

type ProjectCreateData = Awaited<ReturnType<typeof createProduct>>;

export const useProductCreateMutation = ({
  onSuccess,
  onError,
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
