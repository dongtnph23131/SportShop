import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "payments",
  tagTypes: ["Payment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    payMomo: builder.mutation<any, any>({
      query: (momo: any) => ({
        url: "/create_momo",
        method: "POST",
        body: momo,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { usePayMomoMutation } = paymentApi;
export default paymentApi;
