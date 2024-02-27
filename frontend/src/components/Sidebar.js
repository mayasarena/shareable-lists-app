import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ListModal from './ListModal';
import { useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import { SidebarContainer, SidebarListsContainer, ListButton, Header, AddListButton } from '../styles/Sidebar.styled.js';

const Sidebar = ({ selectedList, setSelectedList }) => {
    const [showModal, setShowModal] = useState(false) // controls the state of the modal object
    const { lists, sharedLists } = useContext(DataContext);
  return (
    <>
    <SidebarContainer>
        <AddListButton onClick={() => setShowModal(true)}>Create List</AddListButton>

        {lists && lists.length > 0 && (
            <>
                <Header>Your Lists</Header>
                <SidebarListsContainer>
                    {lists.map((list) => 
                        <ListButton
                            key={list.id} 
                            onClick={() => setSelectedList(list)}
                            isSelected={selectedList && list.id === selectedList.id}
                        >
                            { list.title }
                    </ListButton>
                )}
                </SidebarListsContainer>
            </>
        )}

        {sharedLists && sharedLists.length > 0 && (
            <>
                <Header>Shared Lists</Header>
                <SidebarListsContainer>
                    {sharedLists.map((sharedList) => 
                        <ListButton
                            key={sharedList.id} 
                            onClick={() => setSelectedList(sharedList)}
                            isSelected={selectedList && sharedList.id === selectedList.id}
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