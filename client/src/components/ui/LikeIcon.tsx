import React from "react"
import { toggleLike } from '../../store/reducers/likedSongsSlice';
import { ISong } from "../../types/data-type";
import { useAppSelector, useAppDispatch } from "../../hooks/AppHooks";


interface ILikeIconProps {
  songsInfo: ISong;
}

const LikeIcon: React.FC<ILikeIconProps> = ({songsInfo}) =>{
  const dispatch = useAppDispatch();
  const likedSongs = useAppSelector((state) => state.likedSongs.likedSongs);
  const isLiked = likedSongs.includes(songsInfo.id);


  const handleToggleLike = () => {
    dispatch(toggleLike(songsInfo.id));
  };


  return(
    <i
    className={`cursor-pointer text-xl absolute right-3 transition-colors duration-300 ${
      isLiked ? 'fas fa-heart text-white' : 'far fa-heart text-gray-500'
    }`}
    onClick={handleToggleLike}
    />
  )
}

export default LikeIcon;