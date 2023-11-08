import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    signin: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),
  }),
});
export const { useSignupMutation, useSigninMutation } = authApi;
export default authApi;
