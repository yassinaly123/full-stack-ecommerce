import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () =>  ({
        url: USERS_URL,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        credentials: "include",
      }),
      providesTags: ["User"],
      credentials: "include",
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: USERS_URL,
        method: "POST",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = userApiSlice;
