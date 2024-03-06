import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Profile = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(UserContext);

  return (  
    <>
    profile
    </>
  );
}

export default Profile;