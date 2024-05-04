import { API_URL } from "../../constants";
import { AUTH_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${API_URL}${AUTH_URL}/login`,
        method: "POST",
        body: credentials,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${API_URL}${AUTH_URL}/signup`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_URL}${AUTH_URL}/logout`,
        method: "POST",
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation , useLogoutMutation } = authSlice;