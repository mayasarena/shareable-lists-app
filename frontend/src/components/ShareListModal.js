import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

// The modal sharing a list
const ShareListModal = ({ setShowModal, list }) => {
    const { getLists } = useContext(DataContext);
    const [message, setMessage] = useState('');
    const { user } = useContext(UserContext);

    const [sharedUserEmail, setSharedUserEmail] = useState('')
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (userId !== null) {
            shareList();
        }
    }, [userId]);

    const shareList = async () => {
        try {
            if (userId === user.uid) {
                setMessage(`You can't share a list with yourself...`);
                return
            }

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

            console.log('Shared list added successfully');
            setMessage('List successfully shared');
            setUserId(null);
            getLists();

        } catch (error) {
            console.error('Error sharing list:', error);
            setMessage(`Error sharing list: {error}`);
        }
    };

    const fetchUserFromEmail = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/email/${sharedUserEmail}`);
          if (response.ok) {
            const userData = await response.json();
            setUserId(userData.id);
          } else {
            console.error('Error fetching user:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target
        setSharedUserEmail(value);
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Share your list</h3>
                    <button onClick={() => {
                        setShowModal(false);
                        setMessage('');
                    }}>X</button>
                </div>

                <form>
                    <input 
                        required 
                        type="email"
                        placeholder="share with (email)" 
                        name="email"
                        value={sharedUserEmail} 
                        onChange={handleChange}
                    />
                    <br />
                    {message && <p className="">{message}</p>}
                    <input type="submit" onClick={fetchUserFromEmail}/>
                </form>
            </div>
        </div>
    );
};

export default ShareListModal;