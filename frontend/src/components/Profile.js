import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ColorButton, ColorButtonSelected, ColorOptionsContainer } from '../styles/ColorButtons.styled';
import { ProfileContainer, UserIcon, Form, Option, Input, SubmitButton, Content, Message, Email } from '../styles/Profile.styled';
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: null,
    color: null
  })
  const [message, setMessage] = useState('');

  const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb']
  const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0']

  // Function to select a predetermined text color for contrast
  const getTextColor = (backgroundColor) => {
      const index = backgroundColors.indexOf(backgroundColor);
      return textColors[index];
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${user.uid}`);
      if (response.ok) {
        const userData = await response.json();
        setUserData({ 
          name: userData.name,
          color: userData.color
        });
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const editUserData = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${user.uid}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });

        await updateProfile(user, {
          displayName: userData.name,
        });

        if (!response.ok) {
            throw new Error('Failed to edit user');
        }

        const editedUser = await response.json();
        console.log('User edited:', editedUser);
        setMessage('Changes successfully saved.')
    } catch(error) {
        console.error('Error editing user:', error.message);
        throw error;
    }
}

  useEffect(() => {
    fetchUserData();
    console.log(userData);
  }, [user]);

  const handleChange = (e) => {
    const { value } = e.target

    setUserData(userData => ({
      ...userData,
      name: value,
  }));
};

const setSelectedColor = (color) => {
  setUserData(userData => ({
    ...userData,
    color: color,
  }));
  console.log(userData);
}

  return (  
    <ProfileContainer>
      <Content>
      {userData.color && userData.name && (
      <UserIcon 
        key={user.id} 
        backgroundcolor={userData.color ? userData.color : '#ebebeb'}
        textcolor={getTextColor(userData.color ? userData.color : '#ebebeb')}
        >
        { userData.name[0] } 
      </UserIcon>
      )}

      <Email>{user.email}</Email>

      <Form>
        <Option>
        Display Name:
        <Input 
            required 
            type="email"
            placeholder="share with (email)" 
            name="email"
            value={userData.name ? userData.name : ''} 
            onChange={handleChange}
        />
        </Option>
        <Option>
        Color:
        <ColorOptionsContainer>
        {backgroundColors.map(color => (
            color === userData.color ? ( 
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
        <SubmitButton type="submit" value="Save Changes" onClick={editUserData} />
      </Form>
      <Message>{message}</Message>
      </Content>
    </ProfileContainer>
  );
}

export default Profile;