import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // If need, you can set header for all requests
    prepareHeaders: (headers) => {
      const accessToken = 'someAccessToken';
      headers.set('accept', 'application/json');
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Recipes'],
  keepUnusedDataFor: 600, // Keep 10 mins
  endpoints: () => ({}),
});
