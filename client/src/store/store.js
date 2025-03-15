import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { API } from '../services/service';
import songPlayingReducer from './reducers/songPlayingSlice';
import likedSongsReducer from './reducers/likedSongsSlice';
import likedPlaylistReducer from './reducers/likedPlaylistSlise';

const rootReducer = combineReducers({
  [API.reducerPath]: API.reducer,
  songPlaying: songPlayingReducer,
  likedSongs: likedSongsReducer,
  likedPlaylist: likedPlaylistReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware),
  });
};
