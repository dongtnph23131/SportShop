import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["Order"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    getOrderByUser: builder.query({
      query: (token) => {
        return {
          url: "/orders-by-user",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Order"],
    }),
    getOneOrder: builder.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
        };
      },
      providesTags: ["Order"],
    }),
  }),
});
export const { useGetOrderByUserQuery, useGetOneOrderQuery } = orderApi;
export default orderApi;
