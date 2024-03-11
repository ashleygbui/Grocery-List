import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const MainGroceryStoreList = () => {
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
    const url = 'http://127.0.0.1:5173/api/mainlist'; // Endpoint URL
    console.log('Fetching data from:', url); 
  
    fetch(url, {
      headers: {
        'Accept': 'application/json' 
      }
    })
      
      .then(response => {
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
  

  const columns = [
    { field: 'col1', headerName: 'Item', width: 250, wrap: true, flex: 1 },
    { field: 'col2', headerName: 'Section', width: 150, wrap: true, flex: 1 },
    { field: 'col3', headerName: 'Quantity', width: 150, wrap: true, flex: 1 },
  ];

  return (
    <div>
      <h2>Main Grocery Store List</h2>
      <div style={{ height: 300, width: '100vw' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default MainGroceryStoreList;
