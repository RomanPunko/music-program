import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVolume } from '../../store/reducers/songPlayingSlice';
import SeekBar from '../../ui/seekBar/SeekBar';

const VolumeControl = ({ audioRef }) => {
  const volumeUpIcon = '/Icon/volumeUp.svg';
  const dispatch = useDispatch();
  const volume = useSelector((state) => state.songPlaying.volume);
  const seekRef = useRef(null);
  ///

  const handleVolumeChange = (event) => {
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
        progress={volume}
      ></SeekBar>
    </div>
  );
};

export default VolumeControl;
