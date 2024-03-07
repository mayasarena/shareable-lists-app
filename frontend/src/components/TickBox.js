import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CheckboxContainer, Checkmark } from '../styles/TickBox.styled';
import { DataContext } from '../contexts/DataContext';

// TickBox component for displaying and updating task completion status
const TickBox = ({ list, task, margin }) => {
  // State to track whether the task is checked (completed) or not
  const [isChecked, setIsChecked] = useState(task.completed);
  // Accessing getLists and getSharedLists functions from DataContext
  const { getLists, getSharedLists } = useContext(DataContext);

  // Effect to update isChecked state when the task prop changes
  useEffect(() => {
    setIsChecked(task.completed);
  }, [task]);

  // Function to update task completion status
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
      // Toggling the isChecked state to reflect the updated completion status
      setIsChecked(!isChecked);
      // Refreshing task lists based on whether the task belongs to a shared list or not
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
    // Container for the tickbox
    <CheckboxContainer margin={margin}>
      {/* Checkbox input to toggle task completion status */}
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={updateCompleted} 
      />
      {/* Checkmark icon for visual indication of task completion */}
      <Checkmark />
    </CheckboxContainer>
  );
}

export default TickBox;