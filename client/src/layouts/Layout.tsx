import React from 'react';
import NavBar from '../components/navBar/NavBar';
import AudioPlayer from '../components/AudioPlayer';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="w-full">{children}</main>
      <AudioPlayer />
    </div>
  );
};

export default Layout;
