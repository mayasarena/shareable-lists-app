import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ButtonContainer, HeaderContainer } from '../styles/Container.styled';
import { ProfileButton, SignOutButton } from '../styles/Button.styled';
import { ToggleButton, ToggleHeaderContainer } from '../styles/Sidebar.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 

const Header = ({ setSelectedList, isOpen, setIsOpen, setOpenProfile }) => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    console.log('Logging out')
    logout();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const openProfile = () => {
    setOpenProfile(true);
    setSelectedList(null);
  }

  return (
    <HeaderContainer>
      <ToggleHeaderContainer>
        <ToggleButton onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </ToggleButton>
          Hello, {user.displayName}
      </ToggleHeaderContainer>
        <ButtonContainer>
            <ProfileButton onClick={openProfile}>Profile</ProfileButton>
            <SignOutButton onClick={handleLogout}>Sign Out</SignOutButton>
        </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;