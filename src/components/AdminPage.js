import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Edit, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
import { getBooks, addBook, editBook, deleteBook } from '../services/bookService';
import './admin.css'

const AdminPage = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State to control notification visibility
  const navigate = useNavigate();

  useEffect(() => {
    refreshBooks(); 
  }, []);

  // Automatically hide the notification after 5 seconds
  useEffect(() => {
    if (message) {
      setShowNotification(true); // Show the notification when there's a message
      const timer = setTimeout(() => {
        setShowNotification(false); // Hide after 5 seconds
        setMessage(''); // Clear the message
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout when component unmounts
    }
  }, [message]);

  const refreshBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData); 
    } catch (error) {
      setMessage('Failed to load books.');
      setSuccess(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/'); 
  };

  const handleAddBook = async (bookData) => {
    try {
      const response = await addBook(bookData, username);
      if (response.success) {
        setMessage(response.message);
        setSuccess(true);
        refreshBooks(); 
      } else {
        setMessage(response.message);
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Failed to add book.');
      setSuccess(false);
    }
  };

  const handleEditBook = async (bookData) => {
    try {
      const response = await editBook(bookData, username);
      if (response.success) {
        setMessage(response.message);
        setSuccess(true);
        refreshBooks(); 
      } else {
        setMessage(response.message);
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Failed to edit book.');
      setSuccess(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await deleteBook(bookId, username);
      if (response.success) {
        setMessage(response.message);
        setSuccess(true);
        refreshBooks(); 
      } else {
        setMessage(response.message);
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Failed to delete book.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Admin Dashboard - {username}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Notification Message Box */}
      {message && (
        <div className={`notification ${success ? 'success' : 'error'} ${showNotification ? 'active' : ''}`}>
          {message}
        </div>
      )}

      {/* Grid inside a container */}
      <div className="grid-container">
        <GridComponent
          dataSource={books}
          toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel']}
          editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }}
          actionComplete={(args) => {
            if (args.requestType === 'save') {
              if (args.action === 'add') {
                handleAddBook(args.data);
              } else if (args.action === 'edit') {
                handleEditBook(args.data);
              }
            } else if (args.requestType === 'delete') {
              handleDeleteBook(args.data[0].id);
            }
          }}
          allowPaging={true}
          pageSettings={{ pageSize: 6 }}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" isPrimaryKey={true} width="100" textAlign="Right" isIdentity={true} visible={false} />
            <ColumnDirective field="title" headerText="Title" width="200" />
            <ColumnDirective field="author" headerText="Author" width="150" />
            <ColumnDirective field="isbn" headerText="ISBN" width="150" />
            <ColumnDirective field="Year" headerText="Published Year" width="100" textAlign="Right" />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default AdminPage;
