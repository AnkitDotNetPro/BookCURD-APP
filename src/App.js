import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginDialog from './components/LoginDialog';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState(''); // Define username state

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    const storedUsername = sessionStorage.getItem('username');
    if (role && storedUsername) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUsername(storedUsername); // Retrieve username from session
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === 'Admin' ? <Navigate to="/admin" /> : <Navigate to="/user" />
            ) : (
              <LoginDialog
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole}
                setUsername={setUsername} // Pass setUsername to LoginDialog
              />
            )
          }
        />
        <Route
          path="/admin"
          element={isAuthenticated && userRole === 'Admin' ? <AdminPage username={username} /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={isAuthenticated && userRole === 'User' ? <UserPage username={username} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
