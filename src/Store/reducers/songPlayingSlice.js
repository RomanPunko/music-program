import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentSong: null,
  currentSongsList: [],
  isPlaying: false,
  volume: 20,
  currentTime: 0,
  duration: 0,
  pausedTime: 0,
};

export const songPlayingSlice = createSlice({
  name: "songPlaying",
  initialState,
  reducers: {
    playSong: (state, action) => {
      const { song, songsList } = action.payload;
      state.currentSong = song;
      state.currentSongsList = songsList || state.currentSongsList;
      state.isPlaying = true;
      state.currentTime = state.pausedTime;
    },
    pause: (state) => {
      state.isPlaying = false; 
      state.pausedTime = state.currentTime;
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
      if (!state.currentSongsList.length || !state.currentSong) return;

      const songs = state.currentSongsList;
      const currentIndex = songs.findIndex((song) => song.id === state.currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;

      state.currentSong = songs[nextIndex];
      state.isPlaying = true;
      state.currentTime = 0;
    },
    previousSong: (state) => {
      if (!state.currentSongsList.length || !state.currentSong) return;

      const songs = state.currentSongsList;
      const currentIndex = songs.findIndex((song) => song.id === state.currentSong.id);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    
      if (currentIndex === 0) return;
  
      state.currentSong = songs[previousIndex];
      state.isPlaying = true;
      state.currentTime = 0;
    },
  },
});

export const { playSong, pause, setCurrentTime, setVolume, setDuration, nextSong, previousSong } = songPlayingSlice.actions;
export default songPlayingSlice.reducer;
