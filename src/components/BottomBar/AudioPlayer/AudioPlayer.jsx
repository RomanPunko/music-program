import React, { useEffect, useRef } from "react";
import playArrow from "../../../Icon/playArrow.svg";
import pauseIcon from "../../../Icon/pauseIcon.svg";
import skipPrevious from "../../../Icon/skipPrevious.svg";
import skipNext from "../../../Icon/skipNext.svg";
import "./audioPlayer.scss";
import AudioSlider from "./AudioSlider";
import { useSelector, useDispatch } from "react-redux";
import { playSong, pause, nextSong, previousSong} from "../../../Store/reducers/songPlayingSlice";
import VolumeControl from "./VolumeControl/VolumeControl";


const AudioPlayer = () => {

  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const isPlaying = useSelector((state) => state.songPlaying.isPlaying);
  const audioRef = useRef(null);
  const currentSongsList = useSelector((state) => state.songPlaying.currentSongsList);

  ////

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.urlSong;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  ////////

  const handlePlayPause = () => {
    if (currentSong) {
      isPlaying ? dispatch(pause()) : dispatch(playSong({ song: currentSong, songsList: currentSongsList }));
    }
  };

  /////

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  /////

  const handlePreviousSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(previousSong());
    }
  };

  ////

  const handleNextSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(nextSong());
    }
  };

  ///

  return (
    <div className="flex items-center">

          {/* // спитати чи це точно має бути тут  // */}
      <audio src={currentSong && currentSong.urlSong} ref={audioRef}></audio>

      <div className="flex items-center gap-5 absolute left-1/2 -translate-x-1/2 text-4xl box-content -mt-4">
        <div className="rounded-[10px] p-[5px] cursor-pointer icon-hover">
          <img src={skipPrevious} alt="" className="w-8" onClick={handlePreviousSong}/>
        </div>
        <div className="rounded-[10px] p-[5px] cursor-pointer icon-hover">
          <img
            src={isPlaying ? pauseIcon : playArrow}
            alt=""
            className="w-8"
            onClick={handlePlayPause}
          />
        </div>
        <div className="rounded-[10px] p-[5px] cursor-pointer icon-hover">
          <img src={skipNext} alt="" className="w-8" onClick={handleNextSong} />
        </div>
      </div>
      <div className="absolute bottom-0.5 left-[50%] -translate-x-1/2 mb-[5px]">
        <AudioSlider audioRef={audioRef} />
      </div>
      <VolumeControl audioRef={audioRef}></VolumeControl>
    </div>
  );
};

export default AudioPlayer;
