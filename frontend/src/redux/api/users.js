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

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${import.meta.env.VITE_UPLOADS_URL }`,
        method: 'POST',
        body: formData,
      }),
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: `${import.meta.env.VITE_USERS_URL}`,
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSpecificUserQuery,
  useCreateUserMutation,
  useUploadImageMutation,
} = usersSlice;

