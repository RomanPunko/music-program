import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./audioPlayer.scss";
import { toggleLike } from "../../store/reducers/likedSongsSlice";
import { nextSong } from "../../store/reducers/songPlayingSlice";
import PlayerSlider from "../playerSlider/PlayerSlider";
import VolumeControl from "../volumeController/VolumeControl";
import PlayerButtons from "../playerButtons/PlayerButtons";
import PlayerSongInfo from "../playerSongInfo/PlayerSongInfo";


const AudioPlayer = () => {

  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const currentTime = useSelector((state) => state.songPlaying.currentTime);
  const duration = useSelector((state) => state.songPlaying.duration);
  const isPlaying = useSelector((state) => state.songPlaying.isPlaying);
  
  ////

  useEffect(() => {
    if (currentTime == duration) {
      dispatch(nextSong())
    }
  }, [currentTime, duration, dispatch]);

  ///

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.urlSong;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  ///
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  ///

  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false;

  const handleToggleLike = () => {
    if (currentSong) {
      dispatch(toggleLike(currentSong.id));
    }
  };

  ///

  return (
  <>

    <audio src={currentSong && currentSong.urlSong} ref={audioRef}></audio>

    <div className="bottom-bar flex items-center px-4 w-full h-[70px] absolute bottom-0">
      <PlayerSongInfo/>
      <div className="flex items-center">
        <PlayerButtons/>
        <PlayerSlider audioRef={audioRef} />
        <VolumeControl audioRef={audioRef}/>
      </div>
      <div className="cursor-pointer absolute right-3 w-6 h-6">
        <i
          className={`cursor-pointer text-2xl absolute right-3 transition-colors duration-300 ${
            isLiked ? "fas fa-heart text-white" : "far fa-heart text-gray-500"
          }`}
          onClick={handleToggleLike}
        ></i>
      </div>
    </div>
  </>
  );
};

export default AudioPlayer;