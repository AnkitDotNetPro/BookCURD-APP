import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Search, Inject } from '@syncfusion/ej2-react-grids';
import { getBooks } from '../services/bookService'; 
import './admin.css';

const UserPage = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false); 
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
        setMessage('Books loaded successfully!');
        setSuccess(true);
      } catch (error) {
        setMessage('Failed to load books.');
        setSuccess(false);
      }
    };

    fetchBooks();
  }, []);

  // Automatically hide the notification after 5 seconds
  useEffect(() => {
    if (message) {
      setShowNotification(true); 
      const timer = setTimeout(() => {
        setShowNotification(false); 
        setMessage(''); 
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [message]);

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/'); 
  };

  return (
    <div>
      <div className="header">
        <h2>User Dashboard</h2>
        <i className="fas fa-sign-out-alt logout-icon" onClick={handleLogout}></i> {/* Logout Icon */}
      </div>

      <p>Welcome User! You can view the list of books available.</p>

      {/* Notification Message Box */}
      {message && (
        <div className={`notification ${success ? 'success' : 'error'} ${showNotification ? 'active' : ''}`}>
          {message}
        </div>
      )}

      <div className="grid-container">
        <GridComponent
          dataSource={books}
          toolbar={['Search']}  
          allowPaging={true}
          allowResizing={true}  
          allowTextWrap={true}  
          pageSettings={{ pageSize: 6 }}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" isPrimaryKey={true} width="100" textAlign="Right" />
            <ColumnDirective field="title" headerText="Title" width="200" />
            <ColumnDirective field="author" headerText="Author" width="150" />
            <ColumnDirective field="isbn" headerText="ISBN" width="150" />
            <ColumnDirective field="Year" headerText="Published Year" width="100" textAlign="Right" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Search]} /> {/* Inject Search service */}
        </GridComponent>
      </div>
    </div>
  );
};

export default UserPage;
