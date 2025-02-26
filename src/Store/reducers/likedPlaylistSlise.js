import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedPlaylist: [], 
};

export const likedPlaylistSlice = createSlice({
  name: "likedPlaylist",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const playlistId = action.payload;
      const index = state.likedPlaylist.indexOf(playlistId);

      if (index === -1) {
        state.likedPlaylist.push(playlistId);
      } else {
        state.likedPlaylist.splice(index, 1);
      }
    },
  },
});


export const { toggleLike } = likedPlaylistSlice.actions;
export default likedPlaylistSlice.reducer;