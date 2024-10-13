import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService'; // Fetch books from API
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import './BookList.css';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);
    };

    fetchBooks();
    const role = sessionStorage.getItem('role');
    setUserRole(role);
  }, []);

  const toolbarOptions = ['Edit', 'Delete', 'Update', 'Cancel'];

  const editSettings = {
    allowEditing: userRole === 'Admin',
    allowDeleting: userRole === 'Admin',
  };

  return (
    <div>
      <h2>Book List</h2>
      <GridComponent
        dataSource={books}
        allowPaging={true}
        editSettings={editSettings}
        toolbar={toolbarOptions}
        pageSettings={{ pageSize: 6 }}>
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" isPrimaryKey={true} width="100" textAlign="Left" />
          <ColumnDirective field="title" headerText="Title" width="200" />
          <ColumnDirective field="author" headerText="Author" width="150" />
          <ColumnDirective field="isbn" headerText="ISBN" width="150" />
          <ColumnDirective field="year" headerText="Year" width="100" textAlign="Left" />
        </ColumnsDirective>
        <Inject services={[Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default BookList;
