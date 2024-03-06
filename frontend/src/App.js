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

const App = () => {
  const { user } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState(null);
  const { lists, sharedLists, getLists, getSharedLists } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const allLists = [...(lists || []), ...(sharedLists || [])];

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

  useEffect(() => {
    console.log('open profile', openProfile);
  }, [openProfile]);

  return (
    <>
      {!user && 
      <CenteredContainer>
        <AuthForm />
      </CenteredContainer>
      }
      {user && (
        <AppContainer>
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
}

export default App;
