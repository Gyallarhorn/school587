import { apiSlice } from "./apiSlice";

const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: (params) => {
        return {
          url: `${import.meta.env.VITE_USERS_URL}?${new URLSearchParams(params)}`,
        };
      },
    }),
  }),
});

export const { useFetchUsersQuery } = usersSlice;

