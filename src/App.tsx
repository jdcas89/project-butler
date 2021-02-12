import React from 'react';
import './App.css';
import AppRouter from './config/router';
import ReactQueryAppProvider from './providers/ReactQueryProvider';
import TestUserSelector from './components/TestUserSelector';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <ReactQueryAppProvider>
      <UserProvider>
        <TestUserSelector />
        <AppRouter />
      </UserProvider>
    </ReactQueryAppProvider>
  );
}

export default App;
