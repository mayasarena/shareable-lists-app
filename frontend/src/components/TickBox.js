import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CheckboxContainer, Checkmark } from '../styles/TickBox.styled';
import { DataContext } from '../contexts/DataContext';

const TickBox = ({ list, task, margin }) => {
  const [isChecked, setIsChecked] = useState(task.completed);
  const { getLists, getSharedLists } = useContext(DataContext);

  useEffect(() => {
    setIsChecked(task.completed);
  }, [task]);

  const updateCompleted = async (e) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}/completed`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !isChecked })
    });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      setIsChecked(!isChecked);
      if (list.shared === true) {
          getSharedLists();
      } else {
          getLists();
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <CheckboxContainer margin={margin}>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={updateCompleted} 
      />
      <Checkmark />
    </CheckboxContainer>
  );
}

export default TickBox;