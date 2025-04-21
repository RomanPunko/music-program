import { createSlice } from '@reduxjs/toolkit';

interface ILikedSongsState{
  likedSongs: string[];
}

const initialState: ILikedSongsState = {
  likedSongs: [],
};

export const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const songId = action.payload;
      const index = state.likedSongs.indexOf(songId);

      if (index === -1) {
        state.likedSongs.push(songId);
      } else {
        state.likedSongs.splice(index, 1);
      }
    },
  },
});

export const { toggleLike } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
