import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { ColorButton, ColorButtonSelected, ColorOptionsContainer } from '../styles/ColorButtons.styled';
import { Overlay, Modal, TitleContainer, CancelButton, Title, Option, Form, Input, SubmitButton, ButtonContainer, DeleteButton, DeleteButtonContainer, SubmitButtonContainer } from '../styles/Modal.styled';

// The modal for editing or adding a list
const ListModal = ({ mode, setShowModal, list }) => {
    const editMode = mode === 'edit' ? true : false
    const { getLists } = useContext(DataContext);
    const { user } = useContext(UserContext);
    const [selectedColor, setSelectedColor] = useState(list ? list.color : '');
    const listColors = ['#f23a4d', '#f2843a', '#fcd049', '#0fb858', '#277be8', '#8f5cc4'];

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
            console.log('New list created:', newList)
            setShowModal(false)
            getLists();
        } catch(error) {
            console.error('Error creating list:', error.message);
            throw error;
        }
    };

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
            console.log('List edited:', editedList);
            setShowModal(false);
            getLists();
        } catch(error) {
            console.error('Error editing list:', error.message);
            throw error;
        }
    }

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

    const handleChange = (e) => {
        const { value } = e.target

        setListData(listData => ({
            ...listData,
            title: value,
        }));
        console.log(listData)
    };

    useEffect(() => {
        console.log('selected color changed', selectedColor);
        if (selectedColor) {
            setListData(listData => ({
                ...listData,
                color: selectedColor
            }));
        }
    }, [selectedColor]);

    return (
        <Overlay>
            <Modal>
                <TitleContainer>
                    <Title>{mode} your list</Title>
                </TitleContainer>
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
                        <Option>
                            Color:
                            <ColorOptionsContainer>
                            {listColors.map(color => (
                                color === selectedColor ? ( 
                                <ColorButtonSelected
                                    key={color}
                                    color={color}
                                    onClick={() => setSelectedColor(color)}
                                    style={{ backgroundColor: color }}
                                />
                                ) : (
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
                        <ButtonContainer>
                            <DeleteButtonContainer>
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