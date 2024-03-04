import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ShareListContainer, ShareButton, UserIcon } from '../styles/ShareList.styled';
import ShareListModal from './ShareListModal';
import { UserContext } from '../contexts/UserContext';

const ShareList = ({ list }) => {
    const [showShareListModal, setShowShareListModal] = useState(false); // controls the state of the list modal object
    const [sharedUsers, setSharedUsers] = useState(null);
    const { user } = useContext(UserContext);
    
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

    useEffect(() => {
        fetchSharedUsers();
    }, [list]);

    const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
    const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * backgroundColors.length);
        return backgroundColors[randomIndex];
    };

    // Function to select a predetermined text color for contrast
    const getTextColor = (backgroundColor) => {
        const index = backgroundColors.indexOf(backgroundColor);
        return textColors[index];
    };

    return (
        <ShareListContainer>
            {sharedUsers?.map((user) => {
                const randomColor = getRandomColor();
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
            {(list.owner_id === user.uid) && (
                <ShareButton onClick={() => setShowShareListModal(true)}>Share</ShareButton>
            )}
            {showShareListModal && <ShareListModal setShowModal={setShowShareListModal} list={list} />}
        </ShareListContainer>
  );
}

export default ShareList;