import React from 'react';
import TaskModal from './TaskModal';
import ListModal from './ListModal';
import ShareList from './ShareList';
import ShareListModal from './ShareListModal';
import { useState, useEffect } from 'react';
import TaskListItem from './TaskListItem';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { ListTitle, TaskListContainer, ListDetails, TitleContainer, HeaderContainer, ListTitleContainer, EditListButton, TasksContainer } from '../styles/TaskList.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AddTask from './AddTask';

// TaskList displays all of the tasks in a given list
const TaskList = ({ list, tasks }) => {
  const [showTaskModal, setShowTaskModal] = useState(false); // controls the state of the task modal object
  const [showListModal, setShowListModal] = useState(false); // controls the state of the list modal object
  const { user } = useContext(UserContext);
  const [ownerData, setOwnerData] = useState({
    email: null,
    name: null
  });

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
  }, [list]);

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