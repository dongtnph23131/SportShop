import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const acountApi = createApi({
  reducerPath: "acount",
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
  }),
});
export const {
  useForgotPasswordMutation,
  useResettPasswordMutation,
  useUpdatePasswordMutation,
} = acountApi;
export default acountApi;
