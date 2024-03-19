import { apiSlice } from "./apiSlice";

const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEcomonicActivities: builder.query({
      query: () => `${import.meta.env.VITE_ACTIVITIES_URL}`,
    }),
  }),
});

export const { useFetchEcomonicActivitiesQuery } = activitiesApiSlice;
