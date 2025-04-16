import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, previousSong } from '../store/reducers/songPlayingSlice';
import PlayPauseButton from './PlayPauseButton';

const PlayerButtons = () => {
  const dispatch = useDispatch();
  const currentSongsList = useSelector(
    (state) => state.songPlaying.currentSongsList
  );
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const skipPreviousIcon = '/Icon/skipPrevious.svg';
  const skipNextIcon = '/Icon/skipNext.svg';

  ///

  const handlePreviousSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(previousSong());
    }
  };

  ///

  const handleNextSong = () => {
    if (currentSongsList.length > 0) {
      dispatch(nextSong());
    }
  };

  return (
    <div className="flex items-center gap-5 absolute left-1/2 -translate-x-1/2 text-4xl box-content -mt-4">
      <div
        className="rounded-[10px] p-[5px] cursor-pointer icon-hover hover:rounded-[10px] hover:p-[5px] hover:bg-config-hover-color"
        onClick={handlePreviousSong}
        >
        <img src={skipPreviousIcon} alt="" className="w-8" />
      </div>
      <PlayPauseButton songsInfo={currentSong} songsList={currentSongsList} />
      <div
          className="rounded-[10px] p-[5px] cursor-pointer icon-hover hover:rounded-[10px] hover:p-[5px] hover:bg-config-hover-color"
          onClick={handleNextSong}
        >
        <img src={skipNextIcon} alt="" className="w-8" />
      </div>
    </div>
  );
};

export default PlayerButtons;
