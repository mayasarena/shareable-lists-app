import React from 'react';
import { useContext } from 'react';
import ListModal from './ListModal';
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ButtonContainer, HeaderContainer } from '../styles/Container.styled';
import { SignOutButton } from '../styles/Button.styled';

const Header = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    console.log('Logging out')
    logout();
  };

  return (
    <HeaderContainer>
        <p>Hello, {user.displayName}!</p>
        <ButtonContainer>
            <SignOutButton onClick={handleLogout}>Signout</SignOutButton>
        </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;