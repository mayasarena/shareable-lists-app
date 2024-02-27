import React from 'react';
import { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { UserContext } from '../contexts/UserContext';

// The modal for editing or adding a list
const ListModal = ({ mode, setShowModal, list }) => {
    const editMode = mode === 'edit' ? true : false
    const { getLists } = useContext(DataContext);
    const { user } = useContext(UserContext);

    const [listData, setListData] = useState({
        owner_id: editMode ? list.owner_id : user.uid,
        title: editMode ? list.title : '',
        shared: editMode ? list.shared : false,
        color: editMode ? list.color : 'white'
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
        console.log("changing!", e)
        const { value } = e.target

        setListData(listData => ({
            ...listData,
            title: value
        }));
        console.log(listData)
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>{mode} your list!</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form onSubmit={editMode ? editListData : postListData}>
                    <input 
                        required 
                        maxLength={30} 
                        placeholder="List name goes here" 
                        name="title"
                        value={listData.title} 
                        onChange={handleChange}
                    />
                    <br />
                    <input type="submit" value="Submit" />
                    {editMode && <button onClick={deleteList}>DELETE LIST</button>}
                </form>
            </div>
        </div>
    );
}

export default ListModal;