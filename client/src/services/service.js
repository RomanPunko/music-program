import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'songsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (build) => ({
    fetchPlaylists: build.query({
      query: () => ({
        url: `/playlists`,
      }),
    }),
    fetchSongs: build.query({
      query: () => ({
        url: `/songs`,
      }),
    }),
    fetchPlaylistPageSongs: build.query({
      query: (id) => ({
        url: `/playlists/${id}`,
      }),
    }),
  }),
});

export const {
  useFetchSongsQuery,
  useFetchPlaylistsQuery,
  useFetchPlaylistPageSongsQuery,
} = API;
