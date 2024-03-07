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

const socket = io(process.env.REACT_APP_SERVERURL); // Initializing socket.io client with server URL

// TaskList component displays all of the tasks in a given list
const TaskList = ({ list, tasks, setSelectedList }) => {
  const [showTaskModal, setShowTaskModal] = useState(false); // State to control the visibility of the task modal
  const [showListModal, setShowListModal] = useState(false); // State to control the visibility of the list modal
  const { user } = useContext(UserContext); // Accessing user data from UserContext
  const [ownerData, setOwnerData] = useState({ // State to store owner's data
    email: null,
    name: null
  });
  const { getLists, getSharedLists } = useContext(DataContext); // Accessing functions to get lists and shared lists from DataContext

  // Function to fetch list owner's data
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
    fetchUserData(); // Fetch owner's data
    socket.emit('joinList', list.id); // Join list upon component mount

    return () => {
      socket.emit('leaveList', list.id); // Leave the list upon component unmount
    };
  }, [list]); // Run useEffect when list changes

  useEffect(() => {
    // Event listener for list updates
    socket.on('listUpdated', () => {
      console.log('This list has been updated');
      // Update state and perform actions here based on whether the user is the owner or not
      if (user.uid === list.owner_id) {
        getLists();
      } else {
        getSharedLists();
      }
    });

    // Event listener for list deletion
    socket.on('listDeleted', () => {
      console.log('This list has been deleted');
      // Update state and perform actions here based on whether the user is the owner or not
      setSelectedList(null);
      if (user.uid === list.owner_id) {
        getLists();
      } else {
        getSharedLists();
      }
    });

    // Cleanup event listeners
    return () => {
      socket.off('listUpdated');
      socket.off('listDeleted');
    };
  }, []); // Run useEffect only once when the component mounts

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
          {/* Task modal for creating or editing tasks */}
          {showTaskModal && <TaskModal mode={'create'} setShowModal={setShowTaskModal} list={list} />}
          {/* List modal for editing lists */}
          {showListModal && <ListModal mode={'edit'} setShowModal={setShowListModal} list={list} />}
        </TasksContainer>
    </TaskListContainer>
  );
}

export default TaskList;