import axiosClient from "@/lib/axios-instance";
import { ProductStatus } from "@/types/base";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export async function setProductStatus(body: {
  id: string;
  status: ProductStatus;
}) {
  const response = await axiosClient.post(`/products/${body.id}/status`, {
    status: body.status,
  });

  return response.data;
}

type ProjectCreateData = Awaited<ReturnType<typeof setProductStatus>>;

export const useProductStatusMutation = ({
  ...options
}: Omit<
  UseMutationOptions<
    ProjectCreateData,
    any,
    { id: string; status: ProductStatus }
  >,
  "mutationFn"
> = {}) => {
  return useMutation<
    ProjectCreateData,
    any,
    { id: string; status: ProductStatus }
  >({
    mutationFn: setProductStatus,
    ...options,
  });
};
