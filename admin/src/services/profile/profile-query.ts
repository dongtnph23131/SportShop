import axiosClient from "@/lib/axios-instance";
import { Profile } from "@/types/base";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function getProfile(): Promise<Profile> {
  const response = await axiosClient.get(`/me`);

  return response.data;
}

export type ProfileData = Awaited<ReturnType<typeof getProfile>>;

export const useProfileQuery = <TData = ProfileData>({
  ...options
}: Omit<UseQueryOptions<ProfileData, any, TData>, "queryKey"> = {}) => {
  return useQuery<ProfileData, any, TData>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    ...options,
  });
};
