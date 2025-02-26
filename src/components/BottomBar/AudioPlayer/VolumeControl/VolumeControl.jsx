import React, { useEffect } from "react";
import volumeUp from "../../../../Icon/volumeUp.svg";
import "./volumeControl.scss"
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "../../../../Store/reducers/songPlayingSlice";

const VolumeControl = ( { audioRef } ) => {
  
  const volume = useSelector((state) => state.songPlaying.volume);
  const dispatch = useDispatch();
  

  ////

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value);
    dispatch(setVolume(newVolume));
  };

  ////

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Нормалізація значення (0-100 -> 0-1)
    }
  }, [volume, audioRef]);

  ////

  useEffect(() => {
    const volumeControl = document.querySelector(".volume-control");
    if (volumeControl) {
      volumeControl.style.background = `linear-gradient(to right, #fff ${volume}%, gray ${volume}%)`;
    }
  }, [volume]);

  ////

  return (
    <div className="flex justify-center items-center absolute right-[100px]">
      <img src={volumeUp} alt="Volume" className="w-[26px] h-[26px]" />
      <input
        type="range"
        className="volume-control w-[100px] h-1 ml-3 rounded-lg"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;