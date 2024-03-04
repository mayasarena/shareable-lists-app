import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListContainer from './ListContainer'; 
import { DashboardContainer } from '../styles/Container.styled';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Dashboard = ({ setSelectedList} ) => {
    const { lists, sharedLists } = useContext(DataContext);
    
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
            <Masonry>
                {lists && lists.map(list => (
                    <ListContainer key={list.id} list={list} setSelectedList={setSelectedList} />
                ))}
                {sharedLists && sharedLists.map(sharedList => (
                    <ListContainer key={sharedList.id} list={sharedList} setSelectedList={setSelectedList} />
                ))}
            </Masonry>
        </ResponsiveMasonry>
    );
}

export default Dashboard;