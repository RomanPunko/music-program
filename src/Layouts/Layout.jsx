import React from "react";
import NavBar from "../components/NavBar/NavBar";
import BottomBar from "../components/BottomBar/BottomBar";


const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="w-full">{children}</main>
      <BottomBar />
    </div>
  );
};

export default Layout;
