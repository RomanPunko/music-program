export interface ISong {
  id: string;
  name: string;
  artist: string;
  avatar: string;
  time: string;
  urlSong: string;
}

export interface IPlaylist {
  id: string;
  name: string;
  artist: string;
  avatar: string;
  songs: ISong[];
}