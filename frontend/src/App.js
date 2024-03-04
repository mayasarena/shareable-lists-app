import React from 'react';
import { useEffect, useState, useContext } from 'react';
import TaskList from './components/TaskList';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import './index.css';
import { DataContext } from './contexts/DataContext';
import { UserContext } from './contexts/UserContext';
import { AppContainer, CenteredContainer, ContentContainer } from './styles/Container.styled';
import Dashboard from './components/Dashboard';

const App = () => {
  const { user } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState(null);
  const { lists, sharedLists, getLists, getSharedLists } = useContext(DataContext);

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

  return (
    <>
      {!user && 
      <CenteredContainer>
        <AuthForm />
      </CenteredContainer>
      }
      {user && (
        <AppContainer>
        <Sidebar selectedList={selectedList} setSelectedList={setSelectedList} />
        <ContentContainer backgroundcolor={selectedList ? '#fff' : '#f2f2f2'}>
          <Header />
          {selectedList ? (
            <TaskList key={selectedList.id} list={selectedList} tasks={selectedList.tasks} />
          ) : (
            <>
              <Dashboard setSelectedList={setSelectedList}/>
            </>
          )}
        </ContentContainer>
      </AppContainer>
    )}
  </>
);
}

export default App;
