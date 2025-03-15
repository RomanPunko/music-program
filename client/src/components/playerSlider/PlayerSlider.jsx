import React, { useEffect, useRef, useState,} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTime, setDuration } from "../../store/reducers/songPlayingSlice";
import SeekBar from "../../ui/seekBar/SeekBar";


const PlayerSlider = ({ audioRef }) => {

  const dispatch = useDispatch();
  const currentTime = useSelector((state) => state.songPlaying.currentTime);
  const duration = useSelector((state) => state.songPlaying.duration);
  const seekRef = useRef(null);

  ////

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => dispatch(setCurrentTime(audioRef.current.currentTime));
      audioRef.current.addEventListener("timeupdate", updateTime);

      const updateDuration = () => dispatch(setDuration(audioRef.current.duration));
      audioRef.current.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef, dispatch]);

  ////

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    dispatch(setCurrentTime(seekTime));
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  ////

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  ////

  return (
  <div className="absolute bottom-0.5 left-[50%] -translate-x-1/2 mb-[5px]">
    <div className="flex items-center">
      <p className="text-xs mr-2 opacity-60">{formatTime(currentTime)}</p>
        <SeekBar value={currentTime} width={400} onChange={handleSeek} max={duration} ref={seekRef} ></SeekBar>
      <p className="text-xs ml-2 opacity-60">{formatTime(duration)}</p>
    </div>
  </div>
  );
};

export default PlayerSlider;
