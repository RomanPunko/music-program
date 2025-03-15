import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { play, pause} from "../store/reducers/songPlayingSlice";

const PlayPauseButton = ({songsInfo, songsList}) =>{

  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.songPlaying.isPlaying);
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const playArrowIcon = "../../Icon/playArrow.svg";
  const pauseIcon = "../../Icon/pauseIcon.svg";
  const isActive = currentSong?.id === songsInfo?.id;


  const togglePlayPause = () => {
    if (isActive && isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play({ song: songsInfo, songsList }));
    }
  };

  return(
    <div className="rounded-[10px] p-[5px] cursor-pointer icon-hover" onClick={togglePlayPause}>
      <img
        src={ isActive && isPlaying && currentSong ? pauseIcon : playArrowIcon}
        alt=""
        className="cursor-pointer w-[32px]"
      />
  </div>
  )
}

export default PlayPauseButton;