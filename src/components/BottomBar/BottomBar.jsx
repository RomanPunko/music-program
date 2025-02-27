import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./bottomBar.scss";
import AudioPlayerButtons from "./AudioPlayer/AudioPlayerButtons";
import { toggleLike } from "../../Store/reducers/likedSongsSlice";

const BottomBar = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);

  ///

  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false;

  const handleToggleLike = () => {
    if (currentSong) {
      dispatch(toggleLike(currentSong.id));
    }
  };

  ///


  return (
    <div className="bottom-bar flex items-center px-4 w-full h-[70px] absolute bottom-0">
      <div className="flex items-center">
        {currentSong && (
          <>
            <img
              src={currentSong.avatar}
              alt={currentSong.name}
              className="w-10 h-10 rounded-md"
            />
            <div className="ml-5">
              <div className="">{currentSong.name}</div>
              <div className="">{currentSong.artist}</div>
            </div>
          </>
        )}
      </div>
      <AudioPlayerButtons />
      <div className="cursor-pointer absolute right-3 w-6 h-6">
        <i
          className={`cursor-pointer text-2xl absolute right-3 transition-colors duration-300 ${
            isLiked ? "fas fa-heart text-white" : "far fa-heart text-gray-500"
          }`}
          onClick={handleToggleLike}
        ></i>
      </div>
    </div>
  );
};

export default BottomBar;