import React from "react";
import Song from "../../components/Song/Song";
import { useFetchAllSongsQuery } from "../../Services/service";

const SearchPage = () => {

  const { data: songsList = [], error, isLoading } = useFetchAllSongsQuery();

  ////

  if (isLoading) return <p className="mt-10 text-center">Завантаження...</p>;
  if (error) return <p className="mt-10 text-center">Помилка завантаження</p>;

  ////
  
  return (
    <div className="w-full pt-8 overflow-y-auto pb-[80px] h-full">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Що бажаєте відтворити?"
          className="bg-white rounded-lg text-black max-w-[500px] w-full p-2 mb-8"
        />
      </div>
      <div className="search-page__info">
        <div className="text-5xl mb-5 pl-8">
          <b>Listening now</b>
        </div>
        {songsList.map((song) => <Song key={song.id} songsInfo={song} songsList={songsList} />)}
      </div>
    </div>
  );
};

export default SearchPage;
