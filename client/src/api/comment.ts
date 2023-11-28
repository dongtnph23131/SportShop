import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  tagTypes: ["Comment"],
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    getAllCommentByProduct: builder.query<any, any>({
      query: (productId: any) => {
        return `/comments/${productId}`;
      },
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<any, any>({
      query: ({ token, comment }) => {
        return {
          url: "/comments",
          body: { ...comment },
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Comment"],
    }),
  }),
});
export const { useGetAllCommentByProductQuery, useCreateCommentMutation } =
  commentApi;
export default commentApi;
