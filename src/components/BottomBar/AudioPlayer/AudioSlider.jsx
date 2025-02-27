import React, { useEffect, useRef, useState,} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTime, setDuration } from "../../../Store/reducers/songPlayingSlice";

const AudioSlider = ({ audioRef }) => {
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

  useEffect(() => {
    const seekControl = seekRef.current;
    if (seekControl) {
      const progress = (currentTime / duration) * 100;
      seekControl.style.background = `linear-gradient(to right, #fff ${progress}%, gray ${progress}%)`;
    }
  }, [currentTime, duration]);

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
    <div className="flex items-center">
      <p className="text-xs mr-2 opacity-60">{formatTime(currentTime)}</p>
      <input
        type="range"
        ref={seekRef}
        className="song-control audio-control-path w-[400px] h-[4px] rounded-lg bg-[gray]"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />
      <p className="text-xs ml-2 opacity-60">{formatTime(duration)}</p>
    </div>
  );
};

export default AudioSlider;
