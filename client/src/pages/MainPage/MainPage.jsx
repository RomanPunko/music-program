import React, { useState, useEffect } from "react";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";
import { useFetchPlaylistsQuery } from "../../services/service";

const MainPage = () =>{

  const { data: playlists = [], error, isLoading, } = useFetchPlaylistsQuery();

  if (isLoading) return <p className="mt-10 text-center">Завантаження...</p>;
  if (error) return <p className="mt-10 text-center">Помилка завантаження</p>;

  return(
    <div className= "w-full pt-8 pl-8 overflow-y-auto ">
      <div className= "text-5xl mb-5"><b>For you</b></div>
      <div className="flex gap-12">
        {playlists.map((item) => (
        <PlaylistCard
          avatar = {item.avatar} 
          artist = {item.artist} 
          name = {item.name}
          id={item.id}
          />
        ))}
      </div>
    </div>
  )

}

export default MainPage;