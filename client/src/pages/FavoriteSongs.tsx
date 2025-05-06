import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import PlaylistCard from '../components/PlaylistCard';
import { useAppSelector, useAppDispatch } from '../hooks/AppHooks';
import {
  useFetchSongsQuery,
  useFetchPlaylistsQuery,
} from '../services/service';
import Button from '@mui/material/Button';
import { setIsModalOpen} from '../store/reducers/authModalSlice';


const FavoriteSongs = () => {
  const {
    data: songsList = [],
    isLoading: isSongsLoading,
    error: songsError,
  } = useFetchSongsQuery();
  const {
    data: playlists = [],
    isLoading: isPlaylistsLoading,
    error: playlistsError,
  } = useFetchPlaylistsQuery();
  const likedSongs = useAppSelector((state) => state.likedSongs.likedSongs);
  const likedPlaylist = useAppSelector(
    (state) => state.likedPlaylist.likedPlaylist
  );
  const isUserAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  ///

  if (isSongsLoading || isPlaylistsLoading)
    return <p className="mt-10 text-center">Завантаження...</p>;
  if (songsError || playlistsError)
    return <p className="mt-10 text-center">Помилка завантаження</p>;

  ////

  const likedSongsList = songsList.filter((song) =>
    likedSongs.includes(song.id)
  );

  ///

  const likedPlaylistList = playlists.filter((playlist) =>
    likedPlaylist.includes(playlist.id)
  );

  ///

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setIsModalOpen(true))
  };

  ///

  return (
    <>
      {isUserAuthenticated ?
      <div className="flex flex-col w-full pt-8 pb-[80px] overflow-y-auto h-full">
        <div className="text-5xl pl-8 mb-5">
          <b>Favorite playlists</b>
        </div>
        <div className="flex gap-12 pl-8 mb-8">
          {likedPlaylistList.length > 0 ? (
            likedPlaylistList.map((item, index) => (
              <PlaylistCard
                key={index}
                avatar={item.avatar}
                artist={item.artist}
                name={item.name}
                id={item.id}
              />
            ))
          ) : (
            <p className="m-auto pt-5">You have no favorite playlists</p>
          )}
        </div>
        <div className="text-5xl pl-8 mb-5">
          <b>Favorite tracks</b>
        </div>
        <div className="flex flex-col">
          {likedSongsList.length > 0 ? (
            likedSongsList.map((song, index) => (
              <Song key={index} songsInfo={song} songsList={likedSongsList} />
            ))
          ) : (
            <p className="m-auto pt-5">You have no favorite songs</p>
          )}
        </div>
      </div> 
      : <div className="flex flex-col justify-center w-full h-[80%] text-center gap-8">
          <p className='text-2xl'>Sign in to save your favorite tracks</p>
          <Button 
            variant="contained"
            onClick={handleSignInClick}
            sx={{ 
              backgroundColor: '#333', 
              display: 'block',
              margin: '0 auto',
              width: '200px',
              height: '60px',
              fontSize: '24px',
            }}
          >
            Sign in
          </Button>
        </div>}
    </>
  );
};

export default FavoriteSongs;
