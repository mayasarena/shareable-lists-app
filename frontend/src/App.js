import React from 'react';
import { useEffect, useState, useContext } from 'react';
import TaskList from './components/TaskList';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import './index.css';
import { DataContext } from './contexts/DataContext';
import { UserContext } from './contexts/UserContext';
import { AppContainer, CenteredContainer, ContentContainer, DashboardContainer } from './styles/Container.styled';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

// App component responsible for rendering the application interface
const App = () => {
  // Accessing user data from UserContext
  const { user } = useContext(UserContext);
  // State variables to manage selected list, sidebar visibility, and profile visibility
  const [selectedList, setSelectedList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // Accessing lists and sharedLists data along with their respective functions from DataContext
  const { lists, sharedLists, getLists, getSharedLists } = useContext(DataContext);
  
  // Merging lists and sharedLists into a single array
  const allLists = [...(lists || []), ...(sharedLists || [])];

  // Effect to update the selectedList when lists or sharedLists change
  useEffect(() => {
    if (allLists && selectedList) {
      const updatedSelectedList = allLists.find(list => list.id === selectedList.id);
      console.log('updating selected list');
      setSelectedList(updatedSelectedList);
      if (!updatedSelectedList) {
        setSelectedList(null);
      }
    }
  }, [lists, selectedList, sharedLists]);

  // Effect to log the status of openProfile
  useEffect(() => {
    console.log('open profile', openProfile);
  }, [openProfile]);

  return (
    <>
      {/* Render authentication form if user is not authenticated */}
      {!user && 
      <CenteredContainer>
        <AuthForm />
      </CenteredContainer>
      }
      {/* Render main app components if user is authenticated */}
      {user && (
        <AppContainer>
          {/* Render sidebar, header, task list, dashboard, or profile based on selectedList and openProfile */}
          <Sidebar selectedList={selectedList} setSelectedList={setSelectedList} isOpen={isOpen} setIsOpen={setIsOpen} openProfile={openProfile} setOpenProfile={setOpenProfile}/>
          <ContentContainer backgroundcolor={selectedList ? '#fff' : '#f2f2f2'}>
            <Header setSelectedList={setSelectedList} isOpen={isOpen} setIsOpen={setIsOpen} setOpenProfile={setOpenProfile}/>
            {selectedList && (
              <TaskList key={selectedList.id} list={selectedList} tasks={selectedList.tasks} setSelectedList={setSelectedList} />
            )}
            {!selectedList && !openProfile && (
              <DashboardContainer>
                <Dashboard setSelectedList={setSelectedList}/>
              </DashboardContainer>
            )}
            {openProfile && (
              <Profile />
            )}
          </ContentContainer>
        </AppContainer>
      )}
    </>
  );
};

export default App;
