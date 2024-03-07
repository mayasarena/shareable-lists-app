import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ButtonContainer, HeaderContainer } from '../styles/Container.styled';
import { ProfileButton, SignOutButton } from '../styles/Button.styled';
import { ToggleButton, ToggleHeaderContainer } from '../styles/Sidebar.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 

// Define the Header component responsible for rendering the application header
const Header = ({ setSelectedList, isOpen, setIsOpen, setOpenProfile }) => {
  // Accessing user data and logout function from the UserContext
  const { user, logout } = useContext(UserContext);

  // Function for handling logout event
  const handleLogout = async () => {
    logout(); 
  };

  // Function for toggling the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  }

  // Function for opening user profile and setting the selected list to null
  const openProfile = () => {
    setOpenProfile(true); 
    setSelectedList(null); 
  }

  // Render the Header component
  return (
    <HeaderContainer>
      <ToggleHeaderContainer>
        {/* Sidebar toggle button */}
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