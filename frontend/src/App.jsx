// App.jsx
import React from 'react';
import UserDataGrid from './components/UserGroceryList';
import CompileGroceryList from './components/CompileGroceryList';

function App() {
  return (
    <div>
      <h1>Grocery List</h1>
      <CompileGroceryList/>
      <h1>My List</h1>
      <UserDataGrid/>
      
    </div>
  );
}

export default App;

