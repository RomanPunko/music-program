import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Song from "../../components/Song/Song";
import React, { useState } from "react";
import "./playlistPage.scss";
import { useFetchAllPlaylistsQuery } from "../../Services/service";
import { toggleLike } from "../../Store/reducers/likedPlaylistSlise";


const PlaylistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: playlists, playlistsError, playlistsIsLoading } = useFetchAllPlaylistsQuery();
  const likedPlaylist = useSelector((state) => state.likedPlaylist.likedPlaylist)

  const currentPlaylist = playlists && playlists.find((playlist) => playlist.id === id);

  ///

  if (playlistsIsLoading) return <p className="mt-10 text-center">Завантаження...</p>;
  if (playlistsError) return <p className="mt-10 text-center">Помилка</p>;
  if (!currentPlaylist) return <p className="mt-10 text-center">Плейліст не знайдено.</p>;

  ///

  const isLiked = likedPlaylist.includes(id);

  const handleToggleLike = () =>{
    dispatch(toggleLike(id));
  }

  ///

  return (
    <div className="w-full pt-8 overflow-y-auto pb-[80px] h-full">
      <div className="playlistPage__info flex gap-6 text-3xl pb-8 ">
        <div className="relative">
          <img 
            src={currentPlaylist.avatar}
            className="max-w-[250px] max-h-[250px] rounded-lg ml-8"
            alt={currentPlaylist.name}
          ></img>
          <i
            className={` ${isLiked ? "fas fa-heart" : "far fa-heart"}
              song__like-icon cursor-pointer text-xl absolute right-2 top-2 bg-black bg-opacity-30 p-2 rounded-full`}
            onClick={handleToggleLike}
          ></i>
        </div>
        <div className="flex flex-col justify-end ">
          <div className="">{currentPlaylist.artist}</div>
          <div className="text-6xl font-bold">{currentPlaylist.name}</div>
        </div>
      </div>
      <div className="pt-2">
        {currentPlaylist.songs.map((song, index) => (
          <Song
          key={index}
          songsInfo={song}
          songsList={currentPlaylist.songs}
        />
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;