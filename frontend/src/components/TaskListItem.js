import React from 'react';
import TickBox from './TickBox';
import { useState, useContext, useEffect } from 'react';
import TaskModal from './TaskModal'
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { EditButton, EditContainer, TaskInfo, InfoContainer, Item, ItemContainer, TaskTitle } from '../styles/TaskListItem.styled';
import { UserIcon } from '../styles/ShareList.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ReactTimeAgo from 'react-time-ago';

// TaskListItem component
const TaskListItem = ({ list, task }) => {
  const [showModal, setShowModal] = useState(false) // State to control the visibility of the task modal
  const { getLists, getSharedLists } = useContext(DataContext); // Accessing getLists and getSharedLists functions from DataContext
  const { user } = useContext(UserContext); // Accessing user data from UserContext
  const [creatorData, setCreatorData] = useState({ // State for storing creator data
    email: null,
    name: null,
    color: null
  });
  const [editorData, setEditorData] = useState({ // State for storing last editor data
    email: null,
    name: null,
    color: null
  });

  const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
  const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']

  // Function to get text color based on background color
  const getTextColor = (backgroundColor) => {
    const index = backgroundColors.indexOf(backgroundColor);
    return textColors[index];
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Fetching creator data
      const creatorResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${task.creator_id}`);
      if (creatorResponse.ok) {
        const userData = await creatorResponse.json();
        setCreatorData({ 
          email: userData.email, 
          name: userData.name,
          color: userData.color
        });
      } else {
        console.error('Error fetching creator user data:', creatorResponse.statusText);
      }

      // Fetching last editor data
      if (task.last_edited_by) {
        const editorResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${task.last_edited_by}`);
        if (editorResponse.ok) {
          const userData = await editorResponse.json();
          setEditorData({ 
            email: userData.email, 
            name: userData.name,
            color: userData.color
          });
        } else {
          console.error('Error fetching creator user data:', editorResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [task]);

  return (
    <Item>
      <ItemContainer>
          {/* TickBox component for task completion status */}
          <TickBox list={list} task={task} margin={'41px'}/>
          <InfoContainer>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskInfo>{task.last_edited_by && editorData.name ? (
              <>
                Last edited by {editorData.email === user.email ? 'Me' : editorData.email} ({editorData.name}){' '}
                <ReactTimeAgo date={task.edited_date} local='en-US' />
              </>
              ) : (
                <>
                  Created <ReactTimeAgo date={task.created_date} local='en-US' />
                </>
              )}</TaskInfo>
          </InfoContainer>
      </ItemContainer>

      <EditContainer>
        {/* Creator avatar */}
        {creatorData.name && creatorData.email && (
            <UserIcon 
            backgroundcolor={creatorData.color ? creatorData.color : '#ebebeb'}
            textcolor={getTextColor(creatorData.color ? creatorData.color : '#ebebeb')}
            email={creatorData.email}
            >
            { creatorData.name[0] } 
          </UserIcon>
        )}
        {/* Button to open task modal */}
        <EditButton onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faEllipsis} /></EditButton>
      </EditContainer>
      {/* Task modal */}
      {showModal && <TaskModal mode='edit' setShowModal={setShowModal} task={task} creatorData={creatorData} editorData={editorData}/>}
    </Item>
  );
}

export default TaskListItem;
