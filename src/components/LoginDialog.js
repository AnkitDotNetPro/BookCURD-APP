import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService'; // Adjust the path to the actual service
import './LoginDialog.css';
 

const LoginDialog = ({ setIsAuthenticated, setUserRole, setUsername }) => {
  const [username, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        sessionStorage.setItem('role', response.role); // Save role in sessionStorage
        sessionStorage.setItem('username', response.username); // Save username in sessionStorage
        setUserRole(response.role); // Set role in state
        setUsername(username); // Set username in state
        setIsAuthenticated(true); // Mark as authenticated
  
        switch (response.role) {
          case 'Admin':
            navigate('/admin'); // Redirect to AdminPage
            break;
          case 'User':
            navigate('/user'); // Redirect to UserPage
            break;
          default:
            // Handle any other roles or fallback case
            navigate('/'); // Redirect to home or another fallback page
            break;
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      setError('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <div className="login-dialog">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginDialog;
