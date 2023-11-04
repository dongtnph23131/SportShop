import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cartApi = createApi({
    reducerPath: 'cart',
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getCartOfUser: builder.query({
            query: (token) => {
                return {
                    url: '/get-cart-user',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            providesTags: ['Cart']
        }),
        addItemCart: builder.mutation({
            query: ({ productVariantIds, token }) => {
                return {
                    url: '/add-to-cart',
                    method: 'POST',
                    body: {productVariantIds},
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Cart']
        }),
        removeItemCart: builder.mutation({
            query: ({ productVariantIds, token }) => {
                return {
                    url: '/remove-item-cart',
                    method: 'PATCH',
                    body: {productVariantIds},
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            },
            invalidatesTags: ['Cart']
        }),
    })
})
export const { useGetCartOfUserQuery,useAddItemCartMutation,useRemoveItemCartMutation } = cartApi
export default cartApi