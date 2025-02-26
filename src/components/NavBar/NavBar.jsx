import "./navBar.scss"
import React, { useState } from "react";
import NavItem from "./NavItem";

const NavBar = () =>{ 

  return(
    <div className="nav-bar max-w-[200px] w-full text-xl">
      <div className="nav-bar__logo py-5 pl-4 text-4xl"><i className="fas fa-play">listen</i></div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <NavItem to="/home" icon="fas fa-home" label="Home" />
        </div>
        <div className="flex items-center">
          <NavItem to= "/search" icon="fas fa-search" label="Search" />
        </div>
        <div className="flex items-center">
          <NavItem to = "/favorite" icon="fas fa-heart" label="Favorites" />
        </div>
      </div>
    </div>
  )
}


export default NavBar;