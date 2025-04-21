import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../store/reducers/likedSongsSlice';
import { nextSong } from '../store/reducers/songPlayingSlice';
import PlayerSlider from './PlayerSlider';
import VolumeControl from './VolumeControl';
import PlayerButtons from './PlayerButtons';
import PlayerSongInfo from './PlayerSongInfo';
import LikeIcon from './ui/LikeIcon';
import { useAppSelector, useAppDispatch } from '../hooks/AppHooks'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  const currentSong = useAppSelector((state) => state.songPlaying.currentSong);
  const likedSongs = useAppSelector((state) => state.likedSongs.likedSongs);
  const currentTime = useAppSelector((state) => state.songPlaying.currentTime);
  const duration = useAppSelector((state) => state.songPlaying.duration);
  const isPlaying = useAppSelector((state) => state.songPlaying.isPlaying);

  ////

  useEffect(() => {
    if (currentTime == duration) {
      dispatch(nextSong());
    }
  }, [currentTime, duration, dispatch]);

  ///

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.urlSong;
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
      <audio src ={currentSong && currentSong.urlSong} ref={audioRef}></audio>

      <div className="border-t border-config-border-color bg-config-primary-color flex items-center px-4 w-full h-[70px] absolute bottom-0">
        <PlayerSongInfo />
        <div className="flex items-center">
          <PlayerButtons />
          <PlayerSlider audioRef={audioRef} />
          <VolumeControl audioRef={audioRef} />
        </div>
        <div className="cursor-pointer absolute right-3 w-6 h-6">
          {currentSong && <LikeIcon songsInfo={currentSong} />}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
