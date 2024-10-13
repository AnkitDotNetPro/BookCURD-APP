import axios from 'axios';
import { API_BASE_URL } from '../config';

// Fetch books
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/book`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add book with username in headers
export const addBook = async (bookData, username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book`, bookData, {
      headers: {
        'username': username
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit book with username in headers
export const editBook = async (bookData, username) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/book/${bookData.id}`, bookData, {
      headers: {
        'username': username
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete book with username in headers
export const deleteBook = async (bookId, username) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/book/${bookId}`, {
      headers: {
        'username': username
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
