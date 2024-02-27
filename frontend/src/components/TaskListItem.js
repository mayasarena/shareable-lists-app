import React from 'react';
import TickBox from './TickBox';
import { useState, useContext, useEffect } from 'react';
import TaskModal from './TaskModal'
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

const TaskListItem = ({task}) => {
  const [showModal, setShowModal] = useState(false)
  const { getLists, getSharedLists } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [creatorData, setCreatorData] = useState({
    email: null,
    name: null
  });
  const [editorData, setEditorData] = useState({
    email: null,
    name: null
  });

  const deleteTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await getLists();
        await getSharedLists();
      } else {
        console.error(`Error deleting task: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const fetchUserData = async () => {
    try {
      const creatorResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${task.creator_id}`);
      if (creatorResponse.ok) {
        const userData = await creatorResponse.json();
        setCreatorData({ 
          email: userData.email, 
          name: userData.name 
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
            name: userData.name 
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
    <li className="task-list-item">
      <TickBox task={task} />
      <div className="info-container">
        <p className="task-title">{task.title}</p>
        <p> - Created by {creatorData.name}</p>
        {task.last_edited_by && <p> - Last edited by {editorData.name}</p>}
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteTask}>DELETE</button>
      </div>
      {showModal && <TaskModal mode='edit' setShowModal={setShowModal} task={task}/>}
    </li>
  );
}

export default TaskListItem;
