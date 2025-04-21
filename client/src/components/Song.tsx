import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/AppHooks';
import PlayPauseButton from './PlayPauseButton';
import LikeIcon from './ui/LikeIcon';
import { ISong, IPlaylist } from '../types/data-type';

interface ISongProps{
  songsInfo: ISong,
  songsList: IPlaylist | ISong[],
}

const Song: React.FC<ISongProps> = ({ songsInfo, songsList }) => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.songPlaying.currentSong);
  const isActive = useAppSelector((stete) => stete.songPlaying.isActive);
  const isCurrentSongActive = currentSong?.id === songsInfo?.id && isActive;

  ////

  return (
    <div className={isCurrentSongActive ? 'bg-white/10' : 'hover:bg-white/5'}>
      <div
        key={songsInfo.id}
        className={'grid grid-cols-[auto_1fr_1fr_0.5fr_auto] items-center py-2 px-4 relative text-xl'}
      >
        <PlayPauseButton songsInfo={songsInfo} songsList={songsList} />
        <div className="flex items-center gap-10 ml-4">
          <img
            src={songsInfo.avatar}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div className="truncate">{songsInfo.name}</div>
        </div>
        <div className="truncate">{songsInfo.artist}</div>
        <div className="">{songsInfo.time}</div>
        <LikeIcon
          songsInfo = {songsInfo}
        />
      </div>
    </div>
  );
};

export default Song;
