import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UserDataGrid= () => {
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('groceryList');
    return savedRows ? JSON.parse(savedRows) : [
      { id: 1, col1: 'Strawberry Yogurt', col2: 'Dairy', col3: '3' },
      { id: 2, col1: 'Bananas', col2: 'Produce', col3: '3' },
      { id: 3, col1: 'Family Size Popcorn', col2: 'Snack', col3: '3' },
    ];
  });

  const [newItem, setNewItem] = useState({
    col1: '',
    col2: '',
    col3: '',
  });

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(rows));
  }, [rows]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    const newItemId = rows.length + 1;
    setRows([...rows, { id: newItemId, ...newItem }]);
    setNewItem({ col1: '', col2: '', col3: '' });
  };

  const handleDeleteItem = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const columns = [
    { field: 'col1', headerName: 'Item', width: 250, wrap: true, flex: 1  },
    { field: 'col2', headerName: 'Section', width: 150, wrap: true, flex: 1  },
    { field: 'col3', headerName: 'Quantity', width: 150, wrap: true, flex: 1  },
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
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div style={{ height: 300, width: '100vw' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default UserDataGrid;