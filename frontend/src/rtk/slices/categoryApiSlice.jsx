import { CATEGORIES_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => CATEGORIES_URL,
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => `${CATEGORIES_URL}/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: category,
        credentials : 'include',
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});


export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation} = productSlice;