import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListContainer from './ListContainer'; 
import { DashboardContainer } from '../styles/Container.styled';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// Define the Dashboard component responsible for rendering a dynamic list layout
const Dashboard = ({ setSelectedList }) => {
    // Accessing lists and sharedLists from the DataContext
    const { lists, sharedLists } = useContext(DataContext);
    
    // Render the Dashboard component with responsive Masonry layout
    return (
        // Utilize ResponsiveMasonry for responsive column layout
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 500: 2, 1300: 3 }} // Define breakpoints for column count
        >
            <Masonry>
                {/* Iterate over lists and render ListContainer for each */}
                {lists && lists.map(list => (
                    <ListContainer key={list.id} list={list} setSelectedList={setSelectedList} />
                ))}
                {/* Iterate over sharedLists and render ListContainer for each shared list */}
                {sharedLists && sharedLists.map(sharedList => (
                    <ListContainer key={sharedList.id} list={sharedList} setSelectedList={setSelectedList} />
                ))}
            </Masonry>
        </ResponsiveMasonry>
    );
}

export default Dashboard;