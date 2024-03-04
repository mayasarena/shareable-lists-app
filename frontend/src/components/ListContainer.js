import React from 'react';
import { useState, useEffect, useContext } from 'react';
import TickBox from './TickBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../contexts/UserContext';
import { Container, TitleContainer, Title, Button, ListInfoContainer, ListInfo, TaskList, TaskItem } from '../styles/ListContainer.styled';

const ListContainer = ({ list, setSelectedList }) => {
    const [ownerData, setOwnerData] = useState({
        email: null,
        name: null
      });
    const { user } = useContext(UserContext);

    const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${list.owner_id}`);
          if (response.ok) {
            const userData = await response.json();
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
    
      useEffect(() => {
        fetchUserData();
      }, [list]);

    return (
        <Container color={list.color}>
            <TitleContainer color={list.color}>
                <Title>{list.title}</Title>
                <Button onClick={() => setSelectedList(list)}><FontAwesomeIcon icon={faArrowRightLong} /></Button>
            </TitleContainer>
            {ownerData.email && ownerData.name && list.date && (
                <ListInfoContainer>
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
                    <ListInfo>
                        <FontAwesomeIcon icon={faCalendar} />
                        {new Date(list.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </ListInfo>
                </ListInfoContainer>
            )}
            <TaskList>
                {list.tasks.map(task => (
                    <TaskItem key={task.id}>
                        <TickBox list={list} task={task} margin={'0px'}/>
                        {task.title}
                    </TaskItem>
                ))}
            </TaskList>
        </Container>
    );
}

export default ListContainer;