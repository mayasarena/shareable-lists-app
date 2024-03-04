import React from 'react';
import { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

const TaskModal = ({ setShowModal, task, list }) => {
    const { getLists, getSharedLists } = useContext(DataContext);
    const { user } = useContext(UserContext);

    const [taskData, setTaskData] = useState({
        list_id: task.list_id,
        title: task.title,
        last_edited_by: user.uid,
        edited_date: new Date()
    });

    const editTaskData = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) {
                throw new Error('Failed to edit task');
            }

            const editedTask = await response.json();
            console.log('Task edited:', editedTask);
            setShowModal(false);
            getLists();
            getSharedLists();
        } catch(error) {
            console.error('Error editing task:', error.message);
            throw error;
        }
    }

    const deleteTask = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            getLists();
            getSharedLists();
          } else {
            console.error(`Error deleting task: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error deleting task:', error);
        }
    }

    const handleChange = (e) => {
        console.log("changing!", e)
        const { value } = e.target

        setTaskData(taskData => ({
            ...taskData,
            title: value
        }))
        console.log(taskData)
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Edit your task!</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input 
                        required 
                        maxLength={30} 
                        placeholder="Task goes here" 
                        name="title"
                        value={taskData.title} 
                        onChange={handleChange}
                    />
                    <br />
                    <input type="submit" onClick={editTaskData}/>
                    <button className="delete" onClick={deleteTask}>DELETE</button>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;