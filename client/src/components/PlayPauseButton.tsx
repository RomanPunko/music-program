import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/AppHooks';
import { play, pause } from '../store/reducers/songPlayingSlice';
import { IPlaylist, ISong } from '../types/data-type';

interface IPlayPauseButtonProps{
  songsInfo: ISong | undefined,
  songsList: IPlaylist | ISong[],
}


const PlayPauseButton: React.FC<IPlayPauseButtonProps> = ({ songsInfo, songsList }) => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.songPlaying.isPlaying);
  const currentSong = useAppSelector((state) => state.songPlaying.currentSong);
  const playArrowIcon = '../../Icon/playArrow.svg';
  const pauseIcon = '../../Icon/pauseIcon.svg';
  const isActive = currentSong?.id === songsInfo?.id;

  const togglePlayPause = () => {
    if (isActive && isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play({ song: songsInfo, songsList }));
    }
  };

  return (
    <div
      className="rounded-[10px] p-[5px] cursor-pointer hover:rounded-[10px] hover:p-[5px] hover:bg-config-hover-color"
      onClick={togglePlayPause}
    >
      <img
        src={isActive && isPlaying && currentSong ? pauseIcon : playArrowIcon}
        alt=""
        className="cursor-pointer w-[32px]"
      />
    </div>
  );
};

export default PlayPauseButton;
