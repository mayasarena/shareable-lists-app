import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { ColorButton, ColorButtonSelected, ColorOptionsContainer } from '../styles/ColorButtons.styled';
import { Overlay, Modal, TitleContainer, CancelButton, Title, Option, Form, Input, SubmitButton, ButtonContainer, DeleteButton, DeleteButtonContainer, SubmitButtonContainer } from '../styles/Modal.styled';

// The modal for editing or adding a list
const ListModal = ({ mode, setShowModal, list }) => {
    // Determine if the modal is in edit mode
    const editMode = mode === 'edit' ? true : false;
    // Access functions to get lists from the DataContext
    const { getLists } = useContext(DataContext);
    // Access user data from the UserContext
    const { user } = useContext(UserContext);
    // Initialize state variables
    const [selectedColor, setSelectedColor] = useState(list ? list.color : '');
    // Array of predefined list colors
    const listColors = ['#f23a4d', '#f2843a', '#fcd049', '#0fb858', '#277be8', '#8f5cc4'];

    // Initialize state for list data
    const [listData, setListData] = useState({
        owner_id: editMode ? list.owner_id : user.uid,
        title: editMode ? list.title : '',
        shared: editMode ? list.shared : false,
        color: editMode ? list.color : '#828282',
        date: editMode ? list.date : new Date()
    })

    // Method for posting a new list to the database
    const postListData = async (e) => {
        console.log('posting list data');
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listData)
            });
            if (!response.ok) {
                throw new Error('Failed to create list');
            }

            const newList = await response.json();
            setShowModal(false);
            getLists(); // Only getLists has to be called because users can only edit lists that they own
        } catch(error) {
            console.error('Error creating list:', error.message);
            throw error;
        }
    };

    // Method for editing an existing list in the database
    const editListData = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${list.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(listData)
            });
            if (!response.ok) {
                throw new Error('Failed to edit list');
            }

            const editedList = await response.json();
            setShowModal(false);
            getLists();
        } catch(error) {
            console.error('Error editing list:', error.message);
            throw error;
        }
    }

    // Method for deleting a list
    const deleteList = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${list.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            getLists();
          } else {
            console.error(`Error deleting list: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error deleting list:', error);
        }
      }

    // Handle changes in the list title input field
    const handleChange = (e) => {
        const { value } = e.target

        setListData(listData => ({
            ...listData,
            title: value,
        }));
        console.log(listData)
    };

    // Effect to update list color in state when selected color changes
    useEffect(() => {
        console.log('selected color changed', selectedColor);
        if (selectedColor) {
            setListData(listData => ({
                ...listData,
                color: selectedColor
            }));
        }
    }, [selectedColor]);

    // Render the ListModal component
    return (
        <Overlay>
            <Modal>
                <TitleContainer>
                    <Title>{mode} your list</Title>
                </TitleContainer>
                {/* Form for editing or adding a list */}
                <Form onSubmit={editMode ? editListData : postListData}>
                    <Option>
                        Name:
                        <Input 
                            required 
                            maxLength={30} 
                            placeholder="List name goes here" 
                            name="title"
                            value={listData.title} 
                            onChange={handleChange}
                        />
                    </Option>
                    {/* Color options for the list */}
                    <Option>
                        Color:
                        <ColorOptionsContainer>
                            {/* Map through listColors array and render color buttons */}
                            {listColors.map(color => (
                                color === selectedColor ? ( 
                                    // Selected color button
                                    <ColorButtonSelected
                                        key={color}
                                        color={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{ backgroundColor: color }}
                                    />
                                ) : (
                                    // Unselected color button
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{ backgroundColor: color }}
                                    />
                                )
                            ))}
                        </ColorOptionsContainer>
                    </Option>
                    {/* Container for delete and submit buttons */}
                    <ButtonContainer>
                        <DeleteButtonContainer>
                            {/* Render delete button if in edit mode */}
                            {editMode && <DeleteButton onClick={deleteList}>Delete</DeleteButton>}
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

export default ListModal;