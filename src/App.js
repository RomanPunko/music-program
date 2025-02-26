import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import FavoriteSongs from "./Pages/FavoriteSongsPage/FavoriteSongs";
import SearchPage from "./Pages/SearchPage/SearchPage";
import PlaylistPage from "./Pages/PlaylistPage/PlaylistPage";
import Layout from "./Layouts/Layout";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoriteSongs />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
