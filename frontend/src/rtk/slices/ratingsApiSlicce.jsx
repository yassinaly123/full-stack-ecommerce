import { apiSlice } from "./apiSlice";

export const ratingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRatings: builder.query({
        query: (id) =>  ({
            url: `/ratings/products/${id}`,
            credentials: "include",
        }),
        providesTags: ["Rating"],
        }),
        createRating: builder.mutation({
        query: (rating) => ({
            url: "/ratings",
            method: "POST",
            body: rating,
            credentials: "include",
        }),
        invalidatesTags: ["Rating"],
        }),
    }),
    });

export const { useGetRatingsQuery , useCreateRatingMutation } = ratingsApiSlice;