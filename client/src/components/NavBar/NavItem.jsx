import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const NavItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="flex items-center w-full">
      <Link
        to={to}
        className={`flex gap-2 items-center w-full py-5 pl-4 hover:bg-white/10 active:bg-white/10 ${
          isActive ? 'bg-white/10' : ''
        }`}
      >
        <i className={icon}></i>
        <p>{label}</p>
      </Link>
    </div>
  );
};

export default NavItem;
