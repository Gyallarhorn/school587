import { apiSlice } from "./apiSlice";

const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => {
        return {
          url: `${import.meta.env.VITE_USERS_URL}?${new URLSearchParams(params)}`,
        };
      },
    }),
    getSpecificUser: builder.query({
      query: (id) => `${import.meta.env.VITE_USERS_URL}/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetSpecificUserQuery } = usersSlice;

