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

const App = () => {
  const { lists, sharedLists } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [selectedList, setSelectedList] = useState(null);

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
        <ContentContainer>
          <Header />
          {selectedList ? (
            <TaskList key={selectedList.id} list={selectedList} tasks={selectedList.tasks} />
          ) : (
            <>
              Home
            </>
          )}
        </ContentContainer>
      </AppContainer>
    )}
  </>
);
}

export default App;
