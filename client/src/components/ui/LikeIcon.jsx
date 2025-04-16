import React from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleLike } from '../../store/reducers/likedSongsSlice';

const LikeIcon = ({songsInfo}) =>{
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
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