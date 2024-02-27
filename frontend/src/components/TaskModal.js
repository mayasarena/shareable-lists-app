import React from 'react';
import { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

const TaskModal = ({ mode, setShowModal, task, list }) => {
    const editMode = mode === 'edit' ? true : false
    const { getLists, getSharedLists } = useContext(DataContext);
    const { user } = useContext(UserContext);

    const [taskData, setTaskData] = useState({
        list_id: editMode ? task.list_id : list.id,
        title: editMode ? task.title : '',
        completed: editMode ? task.completed : false,
        creator_id: editMode ? task.creator_id : user.uid,
        last_edited_by: editMode ? user.uid : null
    });

    const postTaskData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const newTask = await response.json();
            console.log('New task created:', newTask);
            setShowModal(false);
            getLists();
            getSharedLists();
        } catch(error) {
            console.error('Error creating task:', error.message);
            throw error;
        }
    };

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
                    <h3>{mode} your task!</h3>
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
                    <input type="submit" onClick={editMode ? editTaskData : postTaskData}/>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;