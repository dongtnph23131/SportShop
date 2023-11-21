import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const addressApi = createApi({
  reducerPath: "address",
  tagTypes: ["Address"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    getAddressByAcount: builder.query({
      query: (token) => {
        return {
          url: `/address/acount`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Address"],
    }),
    createAddress: builder.mutation({
      query: ({ token, address }) => {
        return {
          url: "/address",
          body: { ...address },
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/address/${id}/acount`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ token, data }) => {
        return {
          url: `/address/${data._id}/acount`,
          method: "PATCH",
          body: { ...data },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Address"],
    }),
  }),
});
export const {
  useGetAddressByAcountQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
export default addressApi;
