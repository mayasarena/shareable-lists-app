import React from 'react';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { Modal, Overlay, TitleContainer, Title, Form, Input, Option, ButtonContainer, DeleteButtonContainer, SubmitButtonContainer, SubmitButton, CancelButton, DeleteButton, InfoContainer, Info, TextContainer } from '../styles/Modal.styled';
import ReactTimeAgo from 'react-time-ago';
import { UserIcon } from '../styles/ShareList.styled';

const TaskModal = ({ setShowModal, task, list, creatorData, editorData }) => {
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

    const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
    const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']
  
    const getTextColor = (backgroundColor) => {
      const index = backgroundColors.indexOf(backgroundColor);
      return textColors[index];
  };

    return (
        <Overlay>
            <Modal>
                <TitleContainer>
                    <Title>Edit your task</Title>
                </TitleContainer>
                <InfoContainer>
                    <Info>
                        <UserIcon 
                            backgroundcolor={creatorData.color ? creatorData.color : '#ebebeb'}
                            textcolor={getTextColor(creatorData.color ? creatorData.color : '#ebebeb')}
                            email={creatorData.email}
                            size='30px'
                        >
                            { creatorData.name[0] } 
                        </UserIcon>
                        <TextContainer>
                        Task created by {creatorData.email === user.email ? 'Me' : creatorData.email} ({creatorData.name}) <ReactTimeAgo date={task.created_date} local='en-US' />
                        </TextContainer>
                    </Info>
                    {task.last_edited_by && editorData.name && (
                    <Info>
                        <UserIcon 
                            backgroundcolor={editorData.color ? editorData.color : '#ebebeb'}
                            textcolor={getTextColor(editorData.color ? editorData.color : '#ebebeb')}
                            email={editorData.email}
                            size='30px'
                        >
                            { editorData.name[0] } 
                        </UserIcon>
                        <TextContainer>
                            Last edited by {editorData.email === user.email ? 'Me' : editorData.email} ({editorData.name}){' '}
                            <ReactTimeAgo date={task.edited_date} local='en-US' />
                        </TextContainer>
                    </Info>
                    )}
                </InfoContainer>
                <Form onSubmit={editTaskData}>
                    <Option>
                        Title:
                        <Input 
                            required 
                            maxLength={30} 
                            placeholder="Task goes here" 
                            name="title"
                            value={taskData.title} 
                            onChange={handleChange}
                        />
                    </Option>

                    <ButtonContainer>
                        <DeleteButtonContainer>
                            <DeleteButton onClick={deleteTask}>Delete</DeleteButton>
                        </DeleteButtonContainer>
                        <SubmitButtonContainer>
                            <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
                            <SubmitButton type="submit" value="Okay" />
                        </SubmitButtonContainer>
                    </ButtonContainer>
                </Form>
            </Modal>
        </Overlay>
    );
}

export default TaskModal;