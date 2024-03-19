import { apiSlice } from "./apiSlice";

export const universitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUniversities: builder.query({
      query: (university) => ({
        url: `${import.meta.env.VITE_UNIVERSITY_URL}?university=${university}`,
      }),
    }),
  }),
});

export const { useFetchUniversitiesQuery } = universitiesApiSlice;
