import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UserDataGrid = () => {
  const [userData, setUserData] = useState(null);
  const [rows, setRows] = useState([]);
  const [newItem, setNewItem] = useState({
    col1: '',
    col2: '',
    col3: '',
  });

  useEffect(() => {
    fetchUserData(); // Fetch user's grocery list when component mounts
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  const fetchUserData = () => {
    const url = 'http://127.0.0.1:5173/api/userlist';
    console.log('Fetching data from:', url); 
  
    fetch(url, {
      headers: {
        'Accept': 'application/json' 
      }
    })
      
      .then(response => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setUserData(data);
        setRows(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    const newItemData = {
      col1: newItem.col1,
      col2: newItem.col2,
      col3: newItem.col3
    };

    // Update user grocery list
    fetch('http://127.0.0.1:5173/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItemData)
    })
    .then(response => response.json())
    .then(updatedRows => {
      setRows(updatedRows);
      // Clear the input fields after adding the item
      setNewItem({ col1: '', col2: '', col3: '' });
    })
    .catch(error => console.error('Error adding item to user grocery list:', error));
  };

  const handleDeleteItem = (id) => {
    fetch(`http://127.0.0.1:5173/api/deleteItem/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh the user grocery list after successful deletion
      fetchUserData();
    })
    .catch(error => console.error('Error deleting item from user grocery list:', error));
  };
  

  const columns = [
    { field: 'col1', headerName: 'Item', width: 250, wrap: true, flex: 1 },
    { field: 'col2', headerName: 'Section', width: 150, wrap: true, flex: 1 },
    { field: 'col3', headerName: 'Quantity', width: 150, wrap: true, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <button onClick={() => handleDeleteItem(params.row.id)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      <h2>User Grocery List</h2>

      {/* Input fields and Add Item button */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="col1"
          value={newItem.col1}
          onChange={handleInputChange}
          placeholder="Item"
        />
        <input
          type="text"
          name="col2"
          value={newItem.col2}
          onChange={handleInputChange}
          placeholder="Section"
        />
        <input
          type="text"
          name="col3"
          value={newItem.col3}
          onChange={handleInputChange}
          placeholder="Quantity"
        />

        {/* Button to add the item */}
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* DataGrid */}
      <div style={{ height: 300, width: '100vw' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default UserDataGrid;
