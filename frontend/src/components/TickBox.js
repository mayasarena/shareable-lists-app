import React from 'react';
import { useState } from 'react';

const TickBox = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const updateCompleted = async () => {
    try {
      console.log('id', task.id)
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}/completed`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
    });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      console.log('successfully updated task completion');
      setCompleted(!completed);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <div>
      <button onClick={updateCompleted}>{completed ? 'Completed' : 'Not Completed'}</button>
    </div>
  );
}

export default TickBox;