import React from "react";
import { useSelector} from "react-redux";

const PlayerSongInfo = () =>{

  const currentSong = useSelector((state) => state.songPlaying.currentSong);

  return(
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
  )
}

export default PlayerSongInfo;