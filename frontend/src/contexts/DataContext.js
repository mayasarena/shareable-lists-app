import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [lists, setLists] = useState(null);
    const [sharedLists, setSharedLists] = useState(null);

    const getLists = async () => {
      if (user) {
          try {
              const listsResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/lists/${user.uid}`)
              const listsJson = await listsResponse.json()
              const listsWithTasks = await Promise.all(
                  listsJson.map(async (list) => {
                      const tasksResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${list.id}`)
                      const tasksJson = await tasksResponse.json();
                      const sortedTasks = tasksJson.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)); // Sort tasks by date
                      return { ...list, tasks: sortedTasks };
                  }));
              setLists(listsWithTasks);
          } catch (error) {
              console.error(error)
          }
      } else {
          console.error('No user.')
      }
  };

  const getSharedLists = async () => {
        if (user) {
            try {
                const sharedListsResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/shared_lists/${user.uid}/lists`);
                const sharedListsJson = await sharedListsResponse.json();
                
                // Fetch tasks for each shared list
                const sharedListsWithTasks = await Promise.all(
                    sharedListsJson.map(async (sharedList) => {
                        const tasksResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${sharedList.id}`);
                        const tasksJson = await tasksResponse.json();
                        const sortedTasks = tasksJson.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)); // Sort tasks by date
                        return { ...sharedList, tasks: sortedTasks };
                }));
                setSharedLists(sharedListsWithTasks);
            } catch (error) {
                console.error('Error fetching shared lists:', error);
            }
        } else {
            console.error('No user.');
        }
    };

  useEffect(() => {
    getLists();
    getSharedLists();
}, [user]); // Fetch data whenever user changes

    useEffect(() => {
        console.log("Lists updated", lists);
    }, [lists]);

    useEffect(() => {
        console.log("Shared lists updated", sharedLists);
    }, [sharedLists]);

  return (
    <DataContext.Provider value={{ lists, getLists, sharedLists, getSharedLists }}>
      {children}
    </DataContext.Provider>
  );
};