import { renderUserListGrid } from "./UserGroceryList";
import { renderMainDataGrid } from "./MainGroceryList";

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    const action = data.action;
    const item = data.item;

    if (action === 'addItem') {
        addUserListItem(item);
        addMainDataGridItem(item);
    }
});

document.getElementById('addItemButton').addEventListener('click', function () {
    const name = prompt('Enter name:');
    const age = parseInt(prompt('Enter age:'));
    if (name && !isNaN(age)) {
        socket.send(JSON.stringify({ action: 'addItem', item: { name, age } }));
    } else {
        alert('Invalid input. Please enter a valid name and age.');
    }
});

function addUserListItem(item) {
    // Implement this function to get the current rows for the user's list
    const currentRows = getUserListRows(); // Assuming you have this function
    const newUserListRows = [...currentRows, { id: currentRows.length + 1, ...item }];
    
    // Update the state of the user's list rows here if needed
    
    // Render the user's list grid with the updated rows
    renderUserListGrid(newUserListRows);
}

function addMainDataGridItem(item) {
    // Implement this function to get the current rows for the main data grid
    const currentRows = getMainDataGridRows(); // Assuming you have this function
    const newMainDataGridRows = [...currentRows, { id: currentRows.length + 1, ...item }];
    
    // Update the state of the main data grid rows here if needed
    
    // Render the main data grid with the updated rows
    renderMainDataGrid(newMainDataGridRows);
}
