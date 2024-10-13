import React, { useState, useEffect } from 'react';
import { addBook } from '../services/bookService'; // Service to add books


const AddBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    if (userRole !== 'Admin') {
      setError('Only Admins can add books.');
    }
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        await addBook(bookTitle);
        alert('Book added successfully!');
      } catch (err) {
        setError('Failed to add book.');
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Add a new book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Book title"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
