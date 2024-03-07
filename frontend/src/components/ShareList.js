import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ShareListContainer, ShareButton, UserIcon } from '../styles/ShareList.styled';
import ShareListModal from './ShareListModal';
import { UserContext } from '../contexts/UserContext';

const ShareList = ({ list }) => {
    // State variables for controlling modal and shared users
    const [showShareListModal, setShowShareListModal] = useState(false);
    const [sharedUsers, setSharedUsers] = useState(null);
    const { user } = useContext(UserContext); // Access user data from UserContext
    
    // Function to fetch shared users of the list from the server
    const fetchSharedUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/shared_lists/${list.id}/users`);
            if (response.ok) {
                const sharedUsersData = await response.json();
                setSharedUsers(sharedUsersData);
            }
        } catch (error) {
            console.error('Error fetching shared lists:', error);
        }
    };

    // Fetch shared users when the list changes
    useEffect(() => {
        fetchSharedUsers();
    }, [list]);

    // Predefined background and text colors for user icons
    const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
    const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']

    // Function to select a predetermined text color for contrast based on the background color
    const getTextColor = (backgroundColor) => {
        const index = backgroundColors.indexOf(backgroundColor);
        return textColors[index];
    };

    // Render the ShareList component
    return (
        <ShareListContainer>
            {/* Map through shared users and render user icons */}
            {sharedUsers?.map((user) => {
                return (
                    <UserIcon 
                        key={user.id} 
                        backgroundcolor={user.color ? user.color : '#ebebeb'}
                        textcolor={getTextColor(user.color ? user.color : '#ebebeb')}
                        email={user.email}
                    >
                        { user.name[0] } 
                    </UserIcon>
                );
            })}
            {/* Render share button if the current user is the owner of the list */}
            {(list.owner_id === user.uid) && (
                <ShareButton onClick={() => setShowShareListModal(true)}>Share</ShareButton>
            )}
            {/* Render ShareListModal component if showShareListModal is true */}
            {showShareListModal && <ShareListModal setShowModal={setShowShareListModal} list={list} />}
        </ShareListContainer>
  );
}


export default ShareList;