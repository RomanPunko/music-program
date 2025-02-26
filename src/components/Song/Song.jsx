import React, { useEffect, useRef } from "react";
import playArrow from "../../Icon/playArrow.svg";
import pauseIcon from "../../Icon/pauseIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { playSong, pause} from "../../Store/reducers/songPlayingSlice";
import { toggleLike } from "../../Store/reducers/likedSongsSlice";

const Song = ({ songsInfo, songsList}) => {

  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const isPlaying = useSelector((state) => state.songPlaying.isPlaying);

  const isActive = currentSong && currentSong.id === songsInfo.id;


  ////

  const isLiked = likedSongs.includes(songsInfo.id);

  const handleToggleLike = () => {
    dispatch(toggleLike(songsInfo.id));
  };

  ////

  const togglePlayPause = () => {
    if (isActive && isPlaying) {
      dispatch(pause());
    } else {
      dispatch(playSong({ song: songsInfo, songsList }));
    }
  };

  ////

  return (
    <div className={isActive ? "bg-white/10" : ""}>
      <div
        key={songsInfo.id}
        className={'flex items-center py-2 px-8 relative text-xl'}
      >
        <img
          src={ isActive && isPlaying ? pauseIcon : playArrow}
          alt=""
          className="cursor-pointer mr-5 w-[32px]"
          onClick={togglePlayPause}
        />
        <img
          src={songsInfo.avatar}
          alt=""
          className="w-10 h-10 rounded-md mr-[100px]"
        />
        <div className="mr-5 max-w-[400px] w-full">{songsInfo.name}</div>
        <div className="mr-5 max-w-[400px] w-full">{songsInfo.artist}</div>
        <div className="mr-5 w-full max-w-[100px]">{songsInfo.time}</div>
        <i
          className={`cursor-pointer text-xl absolute right-3 transition-colors duration-300 ${
            isLiked ? "fas fa-heart text-white" : "far fa-heart text-gray-500"
          }`}
          onClick={handleToggleLike}
        ></i>
      </div>
    </div>
  );
};

export default Song;