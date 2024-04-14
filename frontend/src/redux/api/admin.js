import { apiSlice } from "./apiSlice";

const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    getAllCheckedUsers: builder.query({
      query: (params) => {
        return {
          url: `${import.meta.env.VITE_ADMIN_URL}/get-all-users?${new URLSearchParams(params)}`,
        };
      },
    }),

    countNewUsers: builder.query({
      query: () => `${import.meta.env.VITE_ADMIN_URL}/count-new-users`,
    }),

    countCheckedUsers: builder.query({
      query: () => `${import.meta.env.VITE_ADMIN_URL}/count-checked-users`,
    }),

    getNewUsers: builder.query({
      query: (params) => {
        return {
          url: `${import.meta.env.VITE_ADMIN_URL}/new-users?${new URLSearchParams(params)}`,
        };
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/delete-user/${id}`,
        method: 'DELETE',
      }),
    }),

    getSpecificUserByAdmin: builder.query({
      query: (id) => `${import.meta.env.VITE_ADMIN_URL}/specific-user/${id}`,
    }),

    deleteExistingPhoto: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_UPLOADS_URL}/delete`,
        method: 'DELETE',
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/update-user/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),

    countUniversities: builder.query({
      query: () => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/count-university`,
      }),
    }),

    updateUniversity: builder.mutation({
      query: ({ id, updatedUniversity }) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/update-university/${id}`,
        method: 'PUT',
        body: updatedUniversity,
      }),
    }),

    deleteUniversity: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/delete-university/${id}`,
        method: 'DELETE',
      }),
    }),

    createUniversity: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_ADMIN_URL}/create-university`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetNewUsersQuery,
  useGetAllCheckedUsersQuery,
  useCountNewUsersQuery,
  useCountCheckedUsersQuery,
  useDeleteUserMutation,
  useGetSpecificUserByAdminQuery,
  useDeleteExistingPhotoMutation,
  useUpdateUserMutation,
  useCountUniversitiesQuery,
  useDeleteUniversityMutation,
  useUpdateUniversityMutation,
  useCreateUniversityMutation,
} = adminSlice;
