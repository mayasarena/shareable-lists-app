import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { ColorButton, ColorButtonSelected, ColorOptionsContainer } from '../styles/ColorButtons.styled';
import { AuthContainer, Button, ButtonContainer, Form, Option, OptionTitle, SubmitButton, Title } from '../styles/AuthForm.styled';
import { Input } from '../styles/Modal.styled';

const AuthForm = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const userColors = ['#f7bece','#ffe0bf', '#ccfab1','#ccffed', '#bbc1fc', '#f4d4ff'];

  const viewLogIn = (status) => {
    setError(null);
    setIsLogIn(status);
  }

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      setError(null);
    } catch (error) {
      setError(error.message); // Set error message
      console.error(error);
    }
  }

  const signUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Make sure passwords match!')
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);

      // Update user's profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // Send user data to backend
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userCredential.user.uid,
          email: email,
          name: displayName,
          color: selectedColor
        })
      });
      if (!response.ok) {
          throw new Error('Failed to create user.');
      }

      setError(null);

      // send email verification
      //await sendEmailVerification(auth.currentUser);

    } catch (error) {
      setError(error.message);
      console.error('Error signing up user:', error);
    }
  }

  return (
    <AuthContainer>
      <ButtonContainer>
        <Button onClick={() => viewLogIn(true)} isSelected={isLogIn} border={'10px 0px 0px 0px'}>Log in</Button>
        <Button onClick={() => viewLogIn(false)} isSelected={!isLogIn} border={'0px 10px 0px 0px'}>Sign up</Button>
      </ButtonContainer>
      <Form onSubmit={isLogIn ? logIn : signUp}>
          {!isLogIn && 
            <Option>
              <OptionTitle>Name:</OptionTitle>
              <Input type="text" placeholder="Enter your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}></Input>
            </Option>
          }
        {!isLogIn && (
            <Option>
              <OptionTitle>Icon Color:</OptionTitle>
              <ColorOptionsContainer>
                {userColors.map(color => (
                  color === selectedColor ? ( 
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
        )}
        <Option>
          <OptionTitle>Email:</OptionTitle>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
        </Option>
        <Option>
          <OptionTitle>Password:</OptionTitle>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
        </Option>
        {!isLogIn && 
          <Option>
            <OptionTitle>Re-type Password:</OptionTitle>
            <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Input>
          </Option>
        }
        <SubmitButton type='submit'>{isLogIn ? 'Log in' : 'Sign up'}</SubmitButton>
        {error && <div>{error}</div>}
      </Form>
    </AuthContainer>
  )
};

export default AuthForm;