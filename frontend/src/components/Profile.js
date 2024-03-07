import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ColorButton, ColorButtonSelected, ColorOptionsContainer } from '../styles/ColorButtons.styled';
import { ProfileContainer, UserIcon, Form, Option, Input, SubmitButton, Content, Message, Email } from '../styles/Profile.styled';
import { updateProfile } from "firebase/auth";

const Profile = () => {
  // Access user data from the UserContext
  const { user } = useContext(UserContext);
  // State variables for user data and message
  const [userData, setUserData] = useState({
    name: null,
    color: null
  });
  const [message, setMessage] = useState('');

  // Predefined background and text colors
  const backgroundColors = ['#ccfab1', '#f7bece', '#f4d4ff', '#ccffed', '#bbc1fc', '#ffe0bf', '#ebebeb'];
  const textColors = ['#4fb05f', '#b53147', '#7e2f99', '#2c8565', '#3d46a1', '#c77a28', '#b0b0b0'];

  // Function to select a predetermined text color for contrast
  const getTextColor = (backgroundColor) => {
      const index = backgroundColors.indexOf(backgroundColor);
      return textColors[index];
  };

  // Fetch user data from backend
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

  // Edit user data and update profile
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
        setMessage('Changes successfully saved.')
    } catch(error) {
        console.error('Error editing user:', error.message);
        throw error;
    }
}

  // Fetch user data on component mount or when user changes
  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Handle changes in user display name
  const handleChange = (e) => {
    const { value } = e.target

    setUserData(userData => ({
      ...userData,
      name: value,
  }));
};

// Set selected color for user profile
const setSelectedColor = (color) => {
  setUserData(userData => ({
    ...userData,
    color: color,
  }));
}

  // Render the Profile component
  return (  
    <ProfileContainer>
      <Content>
      {/* Render user icon with background color and text color */}
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

      {/* Form for editing user profile */}
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
        {/* Map through background colors and render color buttons */}
        {backgroundColors.map(color => (
            color === userData.color ? ( 
            // Selected color button
            <ColorButtonSelected
                key={color}
                color={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
            />
            ) : (
            // Unselected color button
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
        {/* Submit button for saving changes */}
        <SubmitButton type="submit" value="Save Changes" onClick={editUserData} />
      </Form>
      {/* Display message indicating success or error */}
      <Message>{message}</Message>
      </Content>
    </ProfileContainer>
  );
}

export default Profile;