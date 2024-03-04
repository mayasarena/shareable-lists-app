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

const TaskListItem = ({ list, task}) => {
  const [showModal, setShowModal] = useState(false)
  const { getLists, getSharedLists } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [creatorData, setCreatorData] = useState({
    email: null,
    name: null,
    color: null
  });
  const [editorData, setEditorData] = useState({
    email: null,
    name: null,
    color: null
  });

  const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
  const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']

  const getTextColor = (backgroundColor) => {
    const index = backgroundColors.indexOf(backgroundColor);
    return textColors[index];
};

  const fetchUserData = async () => {
    try {
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
        {creatorData.name && creatorData.email && (
            <UserIcon 
            backgroundcolor={creatorData.color ? creatorData.color : '#ebebeb'}
            textcolor={getTextColor(creatorData.color ? creatorData.color : '#ebebeb')}
            email={creatorData.email}
            >
            { creatorData.name[0] } 
          </UserIcon>
        )}
        <EditButton onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faEllipsis} /></EditButton>
      </EditContainer>
      {showModal && <TaskModal mode='edit' setShowModal={setShowModal} task={task} creatorData={creatorData} editorData={editorData}/>}
    </Item>
  );
}

export default TaskListItem;
