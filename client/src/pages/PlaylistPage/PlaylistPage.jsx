import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Song from "../../components/Song/Song";
import React, { useState } from "react";
import "./playlistPage.scss";
import { useFetchPlaylistPageSongsQuery } from "../../services/service";
import { toggleLike } from "../../store/reducers/likedPlaylistSlise";


const PlaylistPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: playlist, playlistError, playlistIsLoading } = useFetchPlaylistPageSongsQuery(id);
  const likedPlaylist = useSelector((state) => state.likedPlaylist.likedPlaylist)


  ///

  if (playlistIsLoading) return <p className="mt-10 text-center">Завантаження...</p>;
  if (playlistError) return <p className="mt-10 text-center">Помилка</p>;
  if (!playlist) return <p className="mt-10 text-center">Плейліст не знайдено.</p>;

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
            src={playlist.avatar}
            className="max-w-[250px] max-h-[250px] rounded-lg ml-8"
            alt={playlist.name}
          ></img>
          <i
            className={` ${isLiked ? "fas fa-heart" : "far fa-heart"}
              song__like-icon cursor-pointer text-xl absolute right-2 top-2 bg-black bg-opacity-30 p-2 rounded-full`}
            onClick={handleToggleLike}
          ></i>
        </div>
        <div className="flex flex-col justify-end ">
          <div className="">{playlist.artist}</div>
          <div className="text-6xl font-bold">{playlist.name}</div>
        </div>
      </div>
      <div className="pt-2">
        {playlist.songs.map((song, index) => (
          <Song
          key={index}
          songsInfo={song}
          songsList={playlist.songs}
        />
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;