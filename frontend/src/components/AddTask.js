import React from 'react';
import { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, TextInput, TextContainer, ButtonInput } from '../styles/AddTask.styled';

const AddTask = ({ list }) => {
    const { getLists, getSharedLists } = useContext(DataContext);
    const { user } = useContext(UserContext);

    const [taskData, setTaskData] = useState({
        list_id: list.id,
        title: '',
        completed: false,
        creator_id: user.uid,
        last_edited_by: null
    });

    const postTaskData = async (e) => {
        e.preventDefault();

        if (!(taskData.title.trim().length > 0)) {
            console.log('Please write a task');
            return
        }

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
            getLists();
            getSharedLists();
        } catch(error) {
            console.error('Error creating task:', error.message);
            throw error;
        }
    };

    const handleChange = (e) => {
        const { value } = e.target

        setTaskData(taskData => ({
            ...taskData,
            title: value
        }))
        console.log(taskData)
    }

    return (
        <Form>
            <TextContainer>
                <FontAwesomeIcon icon={faPlus} /> 
                <TextInput 
                    required 
                    maxLength={30} 
                    placeholder="Task goes here" 
                    name="title"
                    value={taskData.title} 
                    onChange={handleChange}
                />
            </TextContainer>
            <ButtonInput type="submit" onClick={postTaskData}/>
        </Form>

    );
}

export default AddTask;