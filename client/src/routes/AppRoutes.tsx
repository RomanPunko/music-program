import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import FavoriteSongs from '../pages/FavoriteSongsPage/FavoriteSongs';
import SearchPage from '../pages/SearchPage';
import PlaylistPage from '../pages/PlaylistPage';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/favorite" element={<FavoriteSongs />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
    </Routes>
  );
};
