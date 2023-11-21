import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const acountApi = createApi({
  reducerPath: "acount",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resettPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/resetPassword`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updatePassword: builder.mutation({
      query: ({ value, token }) => {
        return {
          url: `/updatePassword`,
          method: "PATCH",
          body: value,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getProfileByAcount: builder.query({
      query: (token) => {
        return {
          url: "/profile/acount",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: ({ value, token }) => {
        return {
          url: `/profile/update`,
          method: "PATCH",
          body: value,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});
export const {
  useForgotPasswordMutation,
  useResettPasswordMutation,
  useUpdatePasswordMutation,
  useGetProfileByAcountQuery,
  useUpdateProfileMutation,
} = acountApi;
export default acountApi;
