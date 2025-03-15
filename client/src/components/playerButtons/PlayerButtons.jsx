import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextSong, previousSong} from "../../store/reducers/songPlayingSlice";
import PlayPauseButton from "../../ui/PlayPauseButton";
import SkipButton from "../../ui/SkipButton";

const PlayerButtons = () =>{

  const dispatch = useDispatch();
  const currentSongsList = useSelector((state) => state.songPlaying.currentSongsList);
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const skipPreviousIcon = "/Icon/skipPrevious.svg";
  const skipNextIcon = "/Icon/skipNext.svg"

  ///
  
  const handlePreviousSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(previousSong());
    }
  };
  
  ///
  
  const handleNextSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(nextSong());
    }
  };

  return(
    <div className="flex items-center gap-5 absolute left-1/2 -translate-x-1/2 text-4xl box-content -mt-4">
      <SkipButton onClick={handlePreviousSong} skipNextIcon={skipPreviousIcon} />
      <PlayPauseButton songsInfo={currentSong} songsList={currentSongsList}/>
      <SkipButton onClick={handleNextSong} skipNextIcon={skipNextIcon} />
    </div>
  )
}

export default PlayerButtons;