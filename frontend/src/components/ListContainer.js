import React from 'react';
import { useState, useEffect, useContext } from 'react';
import TickBox from './TickBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../contexts/UserContext';
import { Container, TitleContainer, Title, Button, ListInfoContainer, ListInfo, TaskList, TaskItem } from '../styles/ListContainer.styled';

// Define the ListContainer component responsible for rendering individual task lists
const ListContainer = ({ list, setSelectedList }) => {
  // State to store owner's data (email and name)
  const [ownerData, setOwnerData] = useState({
      email: null,
      name: null
  });
  // Accessing user data from the UserContext
  const { user } = useContext(UserContext);

  // Function to fetch owner's data from the server
  const fetchUserData = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${list.owner_id}`);
          if (response.ok) {
              const userData = await response.json();
              // Setting owner's data
              setOwnerData({ 
                  email: userData.email, 
                  name: userData.name 
              });
          } else {
              console.error('Error fetching user data:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };
  
  // Effect hook to fetch owner's data when the list prop changes
  useEffect(() => {
      fetchUserData();
  }, [list]);

  // Render the ListContainer component
  return (
      <Container color={list.color}>
          <TitleContainer color={list.color}>
              <Title>{list.title}</Title>
              <Button onClick={() => setSelectedList(list)}><FontAwesomeIcon icon={faArrowRightLong} /></Button>
          </TitleContainer>
          {/* Display owner's email and name, and list date if available */}
          {ownerData.email && ownerData.name && list.date && (
              <ListInfoContainer>
                  {/* Displaying owner's email or 'Me' if current user owns the list */}
                  {ownerData.email === user.email ? (
                      <ListInfo>
                          <FontAwesomeIcon icon={faUser} />
                          Me
                      </ListInfo>
                  ) : (
                      <ListInfo>
                          <FontAwesomeIcon icon={faUser} />
                          {ownerData.email}
                      </ListInfo>
                  )}
                  {/* Displaying the list date */}
                  <ListInfo>
                      <FontAwesomeIcon icon={faCalendar} />
                      {new Date(list.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </ListInfo>
              </ListInfoContainer>
          )}
          {/* List of tasks with checkbox and task title */}
          <TaskList>
              {/* Mapping through tasks and rendering TaskItem for each */}
              {list.tasks.map(task => (
                  <TaskItem key={task.id}>
                      {/* Rendering tick box for the task */}
                      <TickBox list={list} task={task} margin={'0px'}/>
                      {task.title}
                  </TaskItem>
              ))}
          </TaskList>
      </Container>
  );
}

export default ListContainer;