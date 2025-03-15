import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  currentSongsList: [],
  isPlaying: false,
  isActive: false,
  volume: 20,
  currentTime: 0,
  duration: 0.001,
  pausedTime: 0,
};


export const songPlayingSlice = createSlice({
  name: "songPlaying",
  initialState,
  reducers: {
    play: (state, action) => {
      const { song, songsList } = action.payload;
      state.currentSong = song;
      state.currentSongsList = songsList || state.currentSongsList;
      state.isPlaying = true;
      state.currentTime = state.pausedTime;
      state.isActive = true;
    },
    pause: (state) => {
      state.isPlaying = false; 
      state.pausedTime = state.currentTime;
      state.isActive = true;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    nextSong: (state) => {
      const currentIndex = state.currentSongsList.findIndex((song) => song.id === state.currentSong.id);

      if (currentIndex >= 0 && currentIndex < state.currentSongsList.length - 1) {
        state.currentSong = state.currentSongsList[currentIndex + 1];
        state.isPlaying = true;
        state.currentTime = 0;
      } else{
        state.currentSong = state.currentSongsList[0];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    previousSong: (state) => {
      const currentIndex = state.currentSongsList.findIndex((song) => song.id === state.currentSong.id);

      if (currentIndex > 0) {
        state.currentSong = state.currentSongsList[currentIndex - 1];
        state.isPlaying = true;
        state.currentTime = 0;
      } else{
        state.currentSong = state.currentSongsList[0];
        state.isPlaying = false;
        state.currentTime = 0;
      }
    },
  },
});

export const { play, pause, setCurrentTime, setVolume, setDuration, nextSong, previousSong } = songPlayingSlice.actions;
export default songPlayingSlice.reducer;
