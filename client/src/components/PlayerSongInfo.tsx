import React from 'react';
import { useAppSelector } from '../hooks/AppHooks';

const PlayerSongInfo = () => {
  const currentSong = useAppSelector((state) => state.songPlaying.currentSong);

  return (
    <div className="flex items-center">
      {currentSong && (
        <>
          <img
            src={currentSong.avatar}
            alt={currentSong.name}
            className="w-10 h-10 rounded-md"
          />
          <div className="ml-5">
            <div className="">{currentSong.name}</div>
            <div className="">{currentSong.artist}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerSongInfo;
