import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataProvider } from './contexts/DataContext';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserProvider>
  </React.StrictMode>
);
