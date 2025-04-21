import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISong, IPlaylist } from '../types/data-type';


export const API = createApi({
  reducerPath: 'songsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://67ffe17bb72e9cfaf72630da.mockapi.io/test' }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<IPlaylist[], void>({
      query: () => ({
        url: `/playlists`,
      }),
    }),
    fetchSongs: build.query<ISong[], void>({
      query: () => ({
        url: `/songs`,
      }),
    }),
    fetchPlaylistPageSongs: build.query<IPlaylist, string>({
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
