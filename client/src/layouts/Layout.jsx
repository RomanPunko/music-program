import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import AudioPlayer from '../components/audioPlayer/AudioPlayer';

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="w-full">{children}</main>
      <AudioPlayer />
    </div>
  );
};

export default Layout;
