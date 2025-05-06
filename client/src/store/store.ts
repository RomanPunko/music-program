import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { API } from '../services/service';
import songPlayingReducer from './reducers/songPlayingSlice';
import likedSongsReducer from './reducers/likedSongsSlice';
import likedPlaylistReducer from './reducers/likedPlaylistSlice';
import authModalReducer from './reducers/authModalSlice'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
  [API.reducerPath]: API.reducer,
  songPlaying: songPlayingReducer,
  likedSongs: likedSongsReducer,
  likedPlaylist: likedPlaylistReducer,
  authModal: authModalReducer,
  user: userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']