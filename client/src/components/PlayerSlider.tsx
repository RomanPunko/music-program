import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/AppHooks';
import {
  setCurrentTime,
  setDuration,
} from '../store/reducers/songPlayingSlice';
import SeekBar from './ui/seekBar/SeekBar';

interface IPlayerSliderProps{
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerSlider: React.FC<IPlayerSliderProps> = ({ audioRef }) => {
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector((state) => state.songPlaying.currentTime);
  const duration = useAppSelector((state) => state.songPlaying.duration);
  const seekRef = useRef<HTMLInputElement | null>(null);

  ////

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () =>
        dispatch(setCurrentTime(audioRef.current?.currentTime));
      audioRef.current.addEventListener('timeupdate', updateTime);

      const updateDuration = () =>
        dispatch(setDuration(audioRef.current?.duration));
      audioRef.current.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime);
        audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audioRef, dispatch]);

  ////

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    dispatch(setCurrentTime(seekTime));
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  ////

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  ////

  return (
    <div className="absolute bottom-0.5 left-[50%] -translate-x-1/2 mb-[5px]">
      <div className="flex items-center">
        <p className="text-xs mr-2 opacity-60">{formatTime(currentTime)}</p>
        <SeekBar
          value={currentTime}
          width={400}
          onChange={handleSeek}
          max={duration}
          ref={seekRef}
        />
        <p className="text-xs ml-2 opacity-60">{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default PlayerSlider;
