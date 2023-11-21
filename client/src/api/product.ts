import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  tagTypes: ["Product"],
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, any>({
      query: ({ sort, order, dataCategories, page, limit }) => {
        const categories = dataCategories
          ? dataCategories
              .map((item: any) => {
                return item._id;
              })
              .join(".")
          : [];
        return `/products?&_page=${page}${limit ? `&_limit=${limit}` : ``}${
          sort ? `&_sort=${sort}` : ``
        }${order ? `&_order=${order}` : ``}${
          categories ? `&categories=${categories}` : ``
        }`;
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query<any, any>({
      query: (id: any) => {
        return `/products/${id}`;
      },
      providesTags: ["Product"],
    }),
  }),
});
export const { useGetAllProductsQuery, useGetProductQuery } = productApi;
export default productApi;
