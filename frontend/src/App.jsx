import React from 'react';
import UserGroceryList from './components/UserGroceryList';
import MainGroceryStoreList from './components/MainGroceryList';

const App = () => {
    return (
        <div>
            <UserGroceryList />
            <MainGroceryStoreList />
        </div>
    );
};

export default App;


// // App.jsx
// import React from 'react';
// import UserDataGrid from './components/UserGroceryList';
// import CompileGroceryList from './components/MainGroceryList';

// function App() {
//   return (
//     <div>
//       <h1>Grocery List</h1>
//       {/* <CompileGroceryList/>
//       <h1>My List</h1>
//       <UserDataGrid/> */}
      
//     </div>
//   );
// }

// export default App;

