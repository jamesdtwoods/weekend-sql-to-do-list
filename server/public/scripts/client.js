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
        itemTableBody.innerHTML += (`
        <tr data-itemId="${item.id}">
            <td>${item.text}</td>
            <td>${item.isComplete}</td>
            <td><button id="mark-complete" onclick="markComplete(event)">Mark Complete</button></td>
            <td><button id="delete-item" onclick="deleteItem(event)">Delete Item</button></td>
        </tr>`
        );
    }
}

function markComplete(event) {

};

function deleteItem(event) {

};