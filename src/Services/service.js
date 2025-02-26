import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  reducerPath: 'songsAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
  endpoints: (build) =>({
    fetchAllPlaylists: build.query({
      query: () => ({
        url: `/playlists`
      })
    }),
    fetchAllSongs: build.query({
      query: () => ({
        url: `/AllSongs`
      })
    })
  })
})

export const { useFetchAllSongsQuery, useFetchAllPlaylistsQuery } = API;
