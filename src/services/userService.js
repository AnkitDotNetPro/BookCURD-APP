import axios from 'axios';
import { API_BASE_URL } from '../config';

// Login User
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Auth/login`, {
      username,
      password,
    });
    
    console.log('API Response:', response.data); // Log full response for debugging

    if (response.data.success) {
      return response.data; // Return success and the user's role
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data); // Log API error response
    } else {
      console.error('Error message:', error.message); // Log general error message
    }
    throw error;
  }
};
