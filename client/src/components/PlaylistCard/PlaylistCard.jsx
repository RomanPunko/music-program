import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toggleLike } from '../../store/reducers/likedPlaylistSlise';
import { useSelector, useDispatch } from 'react-redux';

const PlaylistCard = ({ id, avatar, artist, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedPlaylist = useSelector(
    (state) => state.likedPlaylist.likedPlaylist
  );

  ///

  const isLiked = likedPlaylist.includes(id);

  const handleToggleLike = (event) => {
    event.stopPropagation();
    dispatch(toggleLike(id));
  };

  ////

  return (
    <div
      className="flex flex-col relative max-w-[200px] min-h-full p-2 border border-transparent rounded-lg hover:bg-white/10 text-xl cursor-pointer"
      onClick={() => navigate(`/playlist/${id}`)}
    >
      <div>
        <img
          src={avatar}
          alt=""
          className="w-[200px] bg-white rounded-lg mb-2"
        />
      </div>
      <div className="mb-2 text-xl font-bold">{name}</div>
      <div className="playlist__artist">{artist}</div>
      <i
        className={`far ${isLiked ? ' fas fa-heart ' : 'fa-heart '} 
          song__like-icon cursor-pointer text-xl absolute right-3 top-3 bg-black bg-opacity-30 p-2 rounded-full`}
        onClick={handleToggleLike}
      ></i>
    </div>
  );
};

export default PlaylistCard;
