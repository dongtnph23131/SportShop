import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cart",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    getCartOfUser: builder.query({
      query: (token) => {
        return {
          url: "/get-cart-user",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Cart"],
    }),
    addItemCart: builder.mutation({
      query: ({
        productVariantIds,
        productId,
        token,
        quantity,
        productName,
        productVariantName,
        productVariantPrice,
        image,
      }) => {
        return {
          url: "/add-to-cart",
          method: "POST",
          body: {
            productVariantIds,
            productId,
            quantity,
            productName,
            productVariantName,
            productVariantPrice,
            image,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeItemCart: builder.mutation({
      query: ({ productVariantIds, token }) => {
        return {
          url: "/remove-item-cart",
          method: "PATCH",
          body: { productVariantIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateItemCart: builder.mutation({
      query: ({ quantity, productVariantIds, token }) => {
        return {
          url: "/update-item-cart",
          method: "PATCH",
          body: { productVariantIds, quantity },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeItem: builder.mutation({
      query: ({ cartItemId, token }) => {
        return {
          url: "/remove-item",
          method: "PATCH",
          body: { cartItemId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeCart: builder.mutation({
      query: (token) => {
        return {
          url: "/remove-cart",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useGetCartOfUserQuery,
  useAddItemCartMutation,
  useRemoveItemCartMutation,
  useUpdateItemCartMutation,
  useRemoveItemMutation,
  useRemoveCartMutation,
} = cartApi;
export default cartApi;
