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
    const url = 'http://127.0.0.1:5173/api/userlist'; // Endpoint URL
    console.log('Fetching data from:', url); // Log the URL being used for fetching data
  
    fetch(url, {
      headers: {
        'Accept': 'application/json' // Set the Accept header to indicate JSON response
      }
    })
      
      .then(response => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        // Update state or perform other actions with the fetched data
        setUserData(data);
        setRows(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error); // Log any errors
        // Handle errors appropriately (e.g., display an error message to the user)
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
    fetch('http://127.0.0.1:5173/api/addItemToUser', {
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

    // fetch('http://127.0.0.1:5173/api/addItemToMain', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newItemData)
    // })
    // .then(response => response.json())
    // .then(updatedRows => {
    //   setRows(updatedRows);
    //   // Clear the input fields after adding the item
    //   setNewItem({ col1: '', col2: '', col3: '' });
    // })
    // .catch(error => console.error('Error adding item to main grocery list:', error));
  };

  const handleDeleteItem = (id) => {
    // Implement delete item functionality if needed
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


// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const UserGroceryList = () => {
//   const [rows, setRows] = useState(() => {
//     const savedRows = localStorage.getItem('groceryList');
//     return savedRows ? JSON.parse(savedRows) : [
//       { id: 1, col1: 'Strawberry Yogurt', col2: 'Dairy', col3: '3' },
//       { id: 2, col1: 'Bananas', col2: 'Produce', col3: '3' },
//       { id: 3, col1: 'Family Size Popcorn', col2: 'Snack', col3: '3' },
//     ];
//   });

//   const [newItem, setNewItem] = useState({
//     col1: '',
//     col2: '',
//     col3: '',
//   });

//   useEffect(() => {
//     localStorage.setItem('groceryList', JSON.stringify(rows));
//   }, [rows]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   const handleAddItem = () => {
//     const newItemId = rows.length + 1;
//     const newItemData = { id: newItemId, ...newItem };

//     // Update user grocery list
//     setRows([...rows, newItemData]);
//     setNewItem({ col1: '', col2: '', col3: '' });

//     // Send request to update main grocery list
//     fetch('/add-item', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newItemData)
//     })
//     .catch(error => console.error('Error adding item to main grocery list:', error));
//   };

//   const handleDeleteItem = (id) => {
//     const updatedRows = rows.filter((row) => row.id !== id);
//     setRows(updatedRows);
//   };

//   const columns = [
//     { field: 'col1', headerName: 'Item', width: 250, wrap: true, flex: 1  },
//     { field: 'col2', headerName: 'Section', width: 150, wrap: true, flex: 1  },
//     { field: 'col3', headerName: 'Quantity', width: 150, wrap: true, flex: 1  },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       renderCell: (params) => (
//         <button onClick={() => handleDeleteItem(params.row.id)}>Delete</button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div style={{ marginBottom: '1rem' }}>
//         <input
//           type="text"
//           name="col1"
//           value={newItem.col1}
//           onChange={handleInputChange}
//           placeholder="Item"
//         />
//         <input
//           type="text"
//           name="col2"
//           value={newItem.col2}
//           onChange={handleInputChange}
//           placeholder="Section"
//         />
//         <input
//           type="text"
//           name="col3"
//           value={newItem.col3}
//           onChange={handleInputChange}
//           placeholder="Quantity"
//         />

//         <button onClick={handleAddItem}>Add Item</button>
//       </div>
//       <div style={{ height: 300, width: '100vw' }}>
//         <h2>User Grocery List</h2>
//         <DataGrid rows={rows} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default UserGroceryList;
