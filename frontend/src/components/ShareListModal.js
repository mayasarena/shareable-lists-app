import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';
import { Overlay, Modal, TitleContainer, CancelButton, Title, Option, Form, Input, SubmitButton, SubmitButtonContainer, Message } from '../styles/Modal.styled';

// Modal component for sharing a list
const ShareListModal = ({ setShowModal, list }) => {
    const { getLists } = useContext(DataContext); // Access method for updating lists
    const [message, setMessage] = useState(''); // State variable for displaying messages
    const { user } = useContext(UserContext); // Access user data from UserContext

    const [sharedUserEmail, setSharedUserEmail] = useState(''); // State variable for the email of the user to share the list with
    const [userId, setUserId] = useState(null); // State variable for the ID of the user to share the list with

    // Effect hook to share the list when the user ID is set
    useEffect(() => {
        if (userId !== null) {
            shareList();
        }
    }, [userId]);

    // Function to share the list with the user
    const shareList = async () => {
        try {
            if (userId === user.uid) {
                setMessage(`You can't share a list with yourself...`); // Display error message if trying to share with oneself
                return;
            }

            // Add shared list to the database
            const sharedListResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/shared_lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    list_id: list.id,
                    user_id: userId
                })
            });
            if (!sharedListResponse.ok) {
                throw new Error('Failed to add shared list');
            }

            // Update list to indicate it's shared
            const listResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${list.id}/shared`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ shared: true })
            });

            if (!listResponse.ok) {
                throw new Error('Failed to update list');
            }
            setMessage('List successfully shared');
            setUserId(null);
            getLists(); // Refresh lists

        } catch (error) {
            setMessage(`Error sharing list: ${error}`); // Display error message
        }
    };

    // Function to fetch user ID from email
    const fetchUserFromEmail = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/email/${sharedUserEmail}`);
          if (response.ok) {
            const userData = await response.json();
            setUserId(userData.id); // Set user ID if found
          } else {
            console.error('Error fetching user:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
    };

    // Function to handle change in the input field for the email
    const handleChange = (e) => {
        const { value } = e.target;
        setSharedUserEmail(value);
    };

    // Render the ShareListModal component
    return (
        <Overlay>
            <Modal>
                <TitleContainer>
                    <Title>Share your list</Title>
                </TitleContainer>

                <Form>
                    <Option>
                        Email:
                        <Input 
                            required 
                            type="email"
                            placeholder="share with (email)" 
                            name="email"
                            value={sharedUserEmail} 
                            onChange={handleChange}
                        />
                    </Option>
                    {/* Display message if available */}
                    {message && <Message>{message}</Message>}
                    <SubmitButtonContainer>
                        <CancelButton onClick={() => {
                            setShowModal(false); // Close the modal
                            setMessage(''); // Clear message
                        }}>
                            Cancel
                        </CancelButton>
                        <SubmitButton type="submit" value="Share" onClick={fetchUserFromEmail} />
                    </SubmitButtonContainer>
                </Form>
            </Modal>
        </Overlay>
    );
};

export default ShareListModal;