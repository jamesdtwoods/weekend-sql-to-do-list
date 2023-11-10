console.log('JS is sourced!');

// get items on page load
getItems();

// get items
function getItems() {
    axios({
        method: 'GET',
        url: '/todos'
      }).then(function(response) {
            console.log('Got todos', response.data);
            renderItems(response.data);
      }).catch(function (error) {
            console.log('error in todos get', error);
      });
};

// add new items
function addItem() {
    const itemToSend = {
        text: document.getElementById('toDoTextInput').value, 
      };
      console.log('Adding item', itemToSend);
    // clear inputs
    document.getElementById('toDoTextInput').value = '';
    // Send the new item to the server as data
    axios({
    method: 'POST',
    url: '/todos',
    data: itemToSend
    }).then((response) => {
        console.log(response.data);
        getItems();
    }).catch((error) => {
        console.log('error in item post', error); 
        alert('Error adding item. Please try again later.')       
    });
};

// render items on DOM
function renderItems(itemLlist) {
    // Store selector in variable
    const itemTableBody = document.getElementById('to-do-table-body');
    // Empty previous data
    itemTableBody.innerHTML = '';
    // Add all songs to table
    for (let item of itemLlist) {
        itemTableBody.innerHTML += `
        <tr data-testid="toDoItem" data-itemId="${item.id}" class="not-complete">
            <td>${item.text}</td>
            <td>${item.isComplete}</td>
            <td><button data-testid="completeButton" id="mark-complete" onclick="markComplete(event)">Mark Complete</button></td>
            <td><button data-testid="deleteButton" id="delete-item" onclick="deleteItem(event)">Delete Item</button></td>
        </tr>`;
    };
};

// mark items complete 
function markComplete(event) {
    let itemId = event.target.closest('tr').getAttribute('data-itemId');
    console.log('to-do Id:', itemId);
    axios({
      method: 'PUT',
      url: `/todos/${itemId}`
    }).then(response => {
        console.log('item completed:', response.data);
        getItems();
    }).catch(error => {
        console.error('Error marking complete:', error);
        alert('Error marking complete. Please try again later.'); 
    });
};

// delete items
function deleteItem(event) {
    let itemId = event.target.closest('tr').getAttribute('data-itemId');
    console.log('to-do Id:', itemId);
    axios({
      method: 'DELETE',
      url: `/todos/${itemId}`
    }).then(response => {
        console.log('item deleted successfully:', response.data);
        getItems();
    }).catch(error => {
        console.error('Error deleting item:', error);
        alert('Error deleteing item. Please try again later.');     
    });
};