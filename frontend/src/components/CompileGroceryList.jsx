import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CompileGroceryList= () => {
  const initialRows = [
    { id: 1, col1: 'Hello', col2: 'World', col3: '3', col4: 'Everyone', completed: false },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: '3', col4: 'Everyone', completed: false },
    { id: 3, col1: 'Rice', col2: 'Grain', col3: '3', col4: 'Erkan', completed: false },
    { id: 4, col1: 'MUI', col2: 'is Amazing', col3: '3', col4: 'Everyone', completed: false },
    { id: 5, col1: 'Oats', col2: 'Grain', col3: '3', col4: 'Erkan', completed: false },
  ];

  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem('data'));
    return savedData || initialRows;
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const handleToggleCompletion = (id) => {
    setData(data.map((row) =>
      row.id === id ? { ...row, completed: !row.completed } : row
    ));
  };

  const columns = [
    { field: 'col1', headerName: 'Item', width: 150, flex: 1 },
    { field: 'col2', headerName: 'Section', width: 150, flex: 1  },
    { field: 'col3', headerName: 'Quantity', width: 150, flex: 1  },
    { field: 'col4', headerName: 'For Who', width: 150, flex: 1  },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 150,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.value}
          onChange={() => handleToggleCompletion(params.row.id)}
        />
      ),
    },
  ];

  return (
    <div style={{ height: '150%', width: '100vw' }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
};

export default CompileGroceryList;