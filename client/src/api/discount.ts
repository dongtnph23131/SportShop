import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const discountApi = createApi({
  reducerPath: "discount",
  tagTypes: ["Discount"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getDiscounts: builder.query<any,void>({
      query: () => `/discounts`,
      providesTags: ["Discount"],
    }),
  }),
});

export const { useGetDiscountsQuery } = discountApi;
export default discountApi;
