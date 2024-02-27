import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Create a context for managing user authentication state
export const UserContext = createContext();

// UserContextProvider component that wraps your app and provides user authentication state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};