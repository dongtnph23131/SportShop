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
    createOrder: builder.mutation({
      query: ({ token, order }) => {
        return {
          url: "/orders",
          body: { ...order },
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Order"],
    }),
    cancelOrder: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/orders/${id}/cancel`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});
export const {
  useGetOrderByUserQuery,
  useGetOneOrderQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
} = orderApi;
export default orderApi;
