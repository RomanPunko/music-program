import React, { useState, useEffect } from 'react';
import './favoriteSongs.scss';
import Song from '../../components/Song/Song';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFetchSongsQuery,
  useFetchPlaylistsQuery,
} from '../../services/service';

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
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const likedPlaylist = useSelector(
    (state) => state.likedPlaylist.likedPlaylist
  );

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

  return (
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
  );
};

export default FavoriteSongs;
