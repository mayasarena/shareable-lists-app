import React from 'react';
import { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, TextInput, TextContainer, ButtonInput } from '../styles/AddTask.styled';


// Define the AddTask component responsible for adding new tasks to a list
const AddTask = ({ list }) => {
    // Accessing functions to get lists and shared lists from the DataContext
    const { getLists, getSharedLists } = useContext(DataContext);
    // Accessing user data from the UserContext
    const { user } = useContext(UserContext);

    // State to store task data
    const [taskData, setTaskData] = useState({
        list_id: list.id,
        title: '',
        completed: false,
        creator_id: user.uid,
        created_date: null,
        last_edited_by: null
    });

    // Function to post task data to the server
    const postTaskData = async (e) => {
        e.preventDefault();

        // Check if the task title is empty so the user does not save a task with no title
        if (!(taskData.title.trim().length > 0)) {
            console.log('Please write a task');
            return;
        }

        try {
            // Send POST request to create a new task
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            // Parse the response to get the new task data
            const newTask = await response.json();
            console.log('New task created:', newTask);
            // Update the lists after creating the task
            getSharedLists();
            getLists();

            // Clear the task title after adding the task
            setTaskData(taskData => ({
                ...taskData,
                title: ''
            }));

        } catch(error) {
            // Log and throw any errors that occur during the process
            console.error('Error creating task:', error.message);
            throw error;
        }
    };

    // Function to handle changes in the task title input
    const handleChange = (e) => {
        const { value } = e.target;

        // Update the task data with the new title value and set the creation date
        setTaskData(taskData => ({
            ...taskData,
            created_date: new Date(),
            title: value
        }));
    };

    // Render the AddTask component
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