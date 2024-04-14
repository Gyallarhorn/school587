import { apiSlice } from "./apiSlice";

export const universitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUniversities: builder.query({
      query: (params) => ({
        url: `${import.meta.env.VITE_UNIVERSITY_URL}?${new URLSearchParams(params)}`,
      }),
    }),
  }),
});

export const { useFetchUniversitiesQuery } = universitiesApiSlice;
