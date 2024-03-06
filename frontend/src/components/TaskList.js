import React from 'react';
import TaskModal from './TaskModal';
import ListModal from './ListModal';
import ShareList from './ShareList';
import ShareListModal from './ShareListModal';
import { useState, useEffect } from 'react';
import TaskListItem from './TaskListItem';
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';
import { useContext } from 'react';
import { ListTitle, TaskListContainer, ListDetails, TitleContainer, HeaderContainer, ListTitleContainer, EditListButton, TasksContainer } from '../styles/TaskList.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AddTask from './AddTask';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

// TaskList displays all of the tasks in a given list
const TaskList = ({ list, tasks, setSelectedList }) => {
  const [showTaskModal, setShowTaskModal] = useState(false); // controls the state of the task modal object
  const [showListModal, setShowListModal] = useState(false); // controls the state of the list modal object
  const { user } = useContext(UserContext);
  const [ownerData, setOwnerData] = useState({
    email: null,
    name: null
  });
  const { getLists, getSharedLists } = useContext(DataContext);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${list.owner_id}`);
      if (response.ok) {
        const userData = await response.json();
        setOwnerData({ 
          email: userData.email, 
          name: userData.name 
        });
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // Join list upon component mount
    socket.emit('joinList', list.id);

    // Leave the list upon component unmount
    return () => {
      socket.emit('leaveList', list.id);
    };
  }, [list]);

  useEffect(() => {
    socket.on('listUpdated', () => {
      console.log('This list has been updated');
      // update state, perform actions here
      if (user.uid === list.owner_id) {
        getLists();
      } else {
        getSharedLists();
      }
    });

    socket.on('listDeleted', () => {
      console.log('This list has been deleted');
      // update state, perform actions here
      setSelectedList(null);
      if (user.uid === list.owner_id) {
        getLists();
      } else {
        getSharedLists();
      }
    });

    // Clean up event listener
    return () => {
      socket.off('listUpdated');
      socket.off('listDeleted');
    };
  }, []);

  return (
    <TaskListContainer>
      <HeaderContainer>
        <TitleContainer>
          <ListTitleContainer>
            <ListTitle color={list.color}>{ list.title } ({tasks.length})</ListTitle>
            {(list.owner_id === user.uid) && 
              <>
                <EditListButton className="edit" onClick={() => setShowListModal(true)}><FontAwesomeIcon icon={faPenToSquare} /></EditListButton>
              </>
            }
          </ListTitleContainer>
            <ListDetails>Created by 
              {list.owner_id === user.uid ? ' Me ' : ` ${ownerData.name} `} 
              ({ownerData.email}) on {new Date(list.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</ListDetails>
        </TitleContainer>
        <ShareList list={list}/>
      </HeaderContainer>
        <AddTask list={list}/>
        <TasksContainer>
          {tasks?.map((task) => <TaskListItem key={task.id} list={list} task={task} />)}
          {showTaskModal && <TaskModal mode={'create'} setShowModal={setShowTaskModal} list={list} />}
          {showListModal && <ListModal mode={'edit'} setShowModal={setShowListModal} list={list} />}
        </TasksContainer>
    </TaskListContainer>
  );
}

export default TaskList;