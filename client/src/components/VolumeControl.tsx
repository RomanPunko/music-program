import React from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/AppHooks';
import { setVolume } from '../store/reducers/songPlayingSlice';
import SeekBar from './ui/seekBar/SeekBar';

interface IVolumeControlProps{
  audioRef: React.RefObject<HTMLAudioElement | null>,
}


const VolumeControl: React.FC<IVolumeControlProps> = ({ audioRef }) => {
  const volumeUpIcon = '/Icon/volumeUp.svg';
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.songPlaying.volume);
  const seekRef = useRef<HTMLInputElement | null>(null);
  
  ///

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    dispatch(setVolume(newVolume));
  };

  ///

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  ///

  return (
    <div className="flex justify-center items-center absolute right-[100px]">
      <img src={volumeUpIcon} alt="Volume" className="w-[26px] h-[26px]" />
      <SeekBar
        value={volume}
        width={100}
        onChange={handleVolumeChange}
        max={100}
        ref={seekRef}
        // progress={volume}
      ></SeekBar>
    </div>
  );
};

export default VolumeControl;
