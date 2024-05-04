import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber },
        providesTags: ["Product"],
      }),
    }),
    getProductsHavingDiscount: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/discount`,
        providesTags: ["Product"],
      }),
    }),
    getProduct: builder.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: ({id , product}) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: product,
        credentials: "include",
      }),
      credentials: "include",
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ( product ) => ({
        url: `${PRODUCTS_URL}/${product.id}`,
        credentials: "include",
        body: product,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `${PRODUCTS_URL}/category/${categoryId}`,
        providesTags: ["Product"],
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetProductsHavingDiscountQuery,
} = productSlice;
