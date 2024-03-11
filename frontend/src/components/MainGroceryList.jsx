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


// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const MainGroceryStoreList = () => {
//     const columns = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         { field: 'name', headerName: 'Name', width: 150 },
//         { field: 'quantity', headerName: 'Quantity', width: 150 }
//     ];

//     const rows = [
//         { id: 1, name: 'Apple', quantity: 50 },
//         { id: 2, name: 'Banana', quantity: 30 },
//         { id: 3, name: 'Orange', quantity: 40 }
//     ];

//     return (
//         <div style={{ height: '150%', width: '100vw' }}>
//             <h2>Main Grocery Store List</h2>
//             <DataGrid rows={rows} columns={columns} pageSize={5} />
//         </div>
//     );
// };

// export default MainGroceryStoreList;

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const CompileGroceryList= () => {
//   const initialRows = [
//     { id: 1, col1: 'Hello', col2: 'World', col3: '3', col4: 'Everyone', completed: false },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: '3', col4: 'Everyone', completed: false },
//     { id: 3, col1: 'Rice', col2: 'Grain', col3: '3', col4: 'Erkan', completed: false },
//     { id: 4, col1: 'MUI', col2: 'is Amazing', col3: '3', col4: 'Everyone', completed: false },
//     { id: 5, col1: 'Oats', col2: 'Grain', col3: '3', col4: 'Erkan', completed: false },
//   ];

//   const [data, setData] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem('data'));
//     return savedData || initialRows;
//   });

//   useEffect(() => {
//     localStorage.setItem('data', JSON.stringify(data));
//   }, [data]);

//   const handleToggleCompletion = (id) => {
//     setData(data.map((row) =>
//       row.id === id ? { ...row, completed: !row.completed } : row
//     ));
//   };

//   const columns = [
//     { field: 'col1', headerName: 'Item', width: 150, flex: 1 },
//     { field: 'col2', headerName: 'Section', width: 150, flex: 1  },
//     { field: 'col3', headerName: 'Quantity', width: 150, flex: 1  },
//     { field: 'col4', headerName: 'For Who', width: 150, flex: 1  },
//     {
//       field: 'completed',
//       headerName: 'Completed',
//       width: 150,
//       renderCell: (params) => (
//         <input
//           type="checkbox"
//           checked={params.value}
//           onChange={() => handleToggleCompletion(params.row.id)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: '150%', width: '100vw' }}>
//       <DataGrid rows={data} columns={columns} />
//     </div>
//   );
// };

// export default CompileGroceryList;