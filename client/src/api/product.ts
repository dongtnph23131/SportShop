import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productApi = createApi({
    tagTypes: ['Product'],
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<any,any>({
            query: ({ sort, order}) => {
                // const categories = dataCategories ? dataCategories.map(item => {
                //     return item._id
                // }).join('.') : []
                console.log(`/products?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`);
                
                return `/products?${sort ? `&_sort=${sort}` : ``}${order ? `&_order=${order}` : ``}`
            },
            providesTags: ['Product']
        }),
    })
})
export const {useGetAllProductsQuery } = productApi
export default productApi