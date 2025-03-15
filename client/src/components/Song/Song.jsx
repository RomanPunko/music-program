import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../store/reducers/likedSongsSlice';
import PlayPauseButton from '../../ui/PlayPauseButton';

const Song = ({ songsInfo, songsList }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const currentSong = useSelector((state) => state.songPlaying.currentSong);
  const isActive = useSelector((stete) => stete.songPlaying.isActive);

  const isCurrentSongActive = currentSong?.id === songsInfo?.id && isActive;

  ////

  const isLiked = likedSongs.includes(songsInfo.id);

  const handleToggleLike = () => {
    dispatch(toggleLike(songsInfo.id));
  };

  ////

  return (
    <div className={isCurrentSongActive ? 'bg-white/10' : ''}>
      <div
        key={songsInfo.id}
        className={'flex items-center py-2 px-8 relative text-xl'}
      >
        <PlayPauseButton songsInfo={songsInfo} songsList={songsList} />
        <img
          src={songsInfo.avatar}
          alt=""
          className="w-10 h-10 rounded-md mr-[100px] ml-4"
        />
        <div className="mr-5 max-w-[400px] w-full">{songsInfo.name}</div>
        <div className="mr-5 max-w-[400px] w-full">{songsInfo.artist}</div>
        <div className="mr-5 w-full max-w-[100px]">{songsInfo.time}</div>
        <i
          className={`cursor-pointer text-xl absolute right-3 transition-colors duration-300 ${
            isLiked ? 'fas fa-heart text-white' : 'far fa-heart text-gray-500'
          }`}
          onClick={handleToggleLike}
        ></i>
      </div>
    </div>
  );
};

export default Song;
