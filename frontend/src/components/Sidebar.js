import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ListModal from './ListModal';
import { useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { SidebarContainer, SidebarListsContainer, ListButton, Header, AddListButton, ToggleButton, ToggleButtonContainer } from '../styles/Sidebar.styled.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 

const Sidebar = ({ selectedList, setSelectedList, isOpen, setIsOpen, setOpenProfile, openProfile }) => {
    const [showModal, setShowModal] = useState(false) // controls the state of the modal object
    const { getLists, getSharedLists, lists, sharedLists } = useContext(DataContext);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <SidebarContainer isOpen={isOpen}>
        <ToggleButtonContainer>
            <ToggleButton onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faXmark} />
            </ToggleButton>
        </ToggleButtonContainer>
        <AddListButton onClick={() => {
            setShowModal(true);
            setIsOpen(!isOpen);
        }}>
            Create List
        </AddListButton>

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
    {showModal && <ListModal mode='create' setShowModal={setShowModal} />}
    </>
  );
}

export default Sidebar;