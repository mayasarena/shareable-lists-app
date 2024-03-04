import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListContainer from './ListContainer'; 
import { DashboardContainer } from '../styles/Container.styled';

const Dashboard = ({ setSelectedList} ) => {
    const { lists, sharedLists } = useContext(DataContext);
    
    return (
        <DashboardContainer>
            {lists && lists.map(list => (
                <ListContainer key={list.id} list={list} setSelectedList={setSelectedList} />
            ))}
            {sharedLists && sharedLists.map(sharedList => (
                <ListContainer key={sharedList.id} list={sharedList} setSelectedList={setSelectedList} />
            ))}
        </DashboardContainer>
    );
}

export default Dashboard;