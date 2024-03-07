import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ListModal from './ListModal';
import { useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { SidebarContainer, SidebarListsContainer, ListButton, Header, AddListButton, ToggleButton, ToggleButtonContainer } from '../styles/Sidebar.styled.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 

// Sidebar component
const Sidebar = ({ selectedList, setSelectedList, isOpen, setIsOpen, setOpenProfile, openProfile }) => {
    const [showModal, setShowModal] = useState(false) // State to control the visibility of the modal
    const { getLists, getSharedLists, lists, sharedLists } = useContext(DataContext); // Accessing lists and shared lists from DataContext
    const { user } = useContext(UserContext); // Accessing user data from UserContext

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <SidebarContainer isOpen={isOpen}>
        {/* Toggle button to close the sidebar */}
        <ToggleButtonContainer>
            <ToggleButton onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faXmark} />
            </ToggleButton>
        </ToggleButtonContainer>
        {/* Button to open modal for creating a new list */}
        <AddListButton onClick={() => {
            setShowModal(true);
            setIsOpen(!isOpen);
        }}>
            Create List
        </AddListButton>

        {/* Dashboard button */}
        <SidebarListsContainer>
            <ListButton 
                onClick={() => {
                    setSelectedList(null);
                    setIsOpen(!isOpen);
                    setOpenProfile(false);
                }}
                isSelected={!selectedList && !openProfile}
                color='#2d7dfc'
                >
                    Dashboard
            </ListButton>
        </SidebarListsContainer>

        {/* Display user's lists */}
        {lists && lists.length > 0 && (
            <>
                <Header>Your Lists</Header>
                <SidebarListsContainer>
                    {lists.map((list) => 
                        <ListButton
                            key={list.id} 
                            onClick={() => {
                                setSelectedList(list);
                                setIsOpen(!isOpen);
                            }}
                            isSelected={selectedList && list.id === selectedList.id}
                            color={list.color}
                        >
                            { list.title }
                    </ListButton>
                )}
                </SidebarListsContainer>
            </>
        )}

        {/* Display lists shared with the user */}
        {sharedLists && sharedLists.length > 0 && (
            <>
                <Header>Shared With Me</Header>
                <SidebarListsContainer>
                    {sharedLists.map((sharedList) => 
                        <ListButton
                            key={sharedList.id} 
                            onClick={() => {
                                setSelectedList(sharedList);
                                setIsOpen(!isOpen);
                            }}
                            isSelected={selectedList && sharedList.id === selectedList.id}
                            color={sharedList.color}
                        >
                            { sharedList.title }
                    </ListButton>
                )}
                </SidebarListsContainer>
            </>
        )}
    </SidebarContainer>
    {/* Render the ListModal if showModal is true */}
    {showModal && <ListModal mode='create' setShowModal={setShowModal} />}
    </>
  );
}

export default Sidebar;