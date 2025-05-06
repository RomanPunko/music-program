import React, { useState } from 'react';
import NavItem from './NavItem';
import Button from '@mui/material/Button';
import UserAuthModal from '../authModal/UserAuthModal';
import { useAppDispatch } from '../../hooks/AppHooks';
import { useAppSelector } from '../../hooks/AppHooks';
import { setIsModalOpen } from '../../store/reducers/authModalSlice';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.authModal.isModalOpen);

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setIsModalOpen(true))
  };

  
  return (
    <div className="border-r border-config-border-color bg-config-primary-color max-w-[200px] w-full text-xl flex flex-col h-screen">
      <div className="border-b border-config-border-color py-5 pl-4 text-4xl">
        <i className="fas fa-play">listen</i>
      </div> 
      <div className="flex flex-col flex-grow">
        <NavItem to="/home" icon="fas fa-home" label="Home" />
        <NavItem to="/search" icon="fas fa-search" label="Search" />
        <NavItem to="/favorite" icon="fas fa-heart" label="Favorites" />
      </div>
      <Button 
        variant="contained"
        onClick={handleSignInClick}
        sx={{ 
          backgroundColor: '#333', 
          display: 'block', 
          margin: '0 auto',
          mb: '80px'
        }}
      >
        Sign in
      </Button>
      {isModalOpen && <UserAuthModal/>}
    </div>
  );
};

export default NavBar;