console.log('JS is sourced!');

// get items on page load
getItems();

// get items
function getItems() {
    axios({
        method: 'GET',
        url: '/todos'
    }).then(function (response) {
        console.log('Got todos', response.data);
        renderItems(response.data);
    }).catch(function (error) {
        console.log('error in todos get', error);
    });
};

// add new items
function addItem(event) {
    event.preventDefault();
    const itemToSend = {
        text: document.getElementById('toDoTextInput').value,
        type: document.getElementById('toDoTypeInput').value
    };
    console.log('Adding item', itemToSend);
    // clear inputs
    document.getElementById('toDoTextInput').value = '';
    document.getElementById('toDoTypeInput').value = '';
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
        let dateFormatted = formatDate(item.dateCompleted);
        itemTableBody.innerHTML += `
        <tr data-testid="toDoItem" data-itemId="${item.id}" ${item.isComplete != true ? `class="not-complete"` : `class="completed"`}>
            <td>${item.isComplete != true ? `<strong>${item.text}</strong>` : `${item.text} --- ✅ on: ${dateFormatted}`}</td>
            <td>${item.type}</td>
            <td>${item.isComplete != true ? `<button data-testid="completeButton" id="mark-complete" onclick="markComplete(event)" class="btn btn-success">Check it off</button>` : `<button data-testid="completeButton" id="mark-complete" onclick="markComplete(event)" class="btn btn-warning">Whoops, not done</button>`}</td>
            <td><button data-testid="deleteButton" id="delete-item" data-bs-toggle="modal" data-bs-target="#exampleModal${item.id}" class="btn btn-danger">Delete Item</button></td>

            <div class="modal fade" id="exampleModal${item.id}" data-itemId="${item.id}" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Warning!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    Are you sure you want to delete this item?
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteItem(${item.id})">Delete</button>
                    </div>
                </div>
                </div>
            </div>

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
function deleteItem(itemIdFromRow) {
    let itemId = itemIdFromRow;
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

// date formater
function formatDate(date) {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "America/Chicago",
      };
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};


// function myDateParse(s) {
//     let b = s.split(/\D/);
//     --b[1];                  // Adjust month number
//     b[6] = b[6].substr(0,3); // Microseconds to milliseconds
//     return new Date(Date.UTC(...b));
// }

// let dateCompleted = item.dateCompleted;
// let dateFormatted = new Date(dateCompleted.replace(' ', 'T'));
// console.log(dateFormatted);
// let dateFormatedMoment = moment(dateFormatted)
// console.log(dateFormatedMoment);

// console.log(typeof dateCompleted);
// console.log('before conversion', dateCompleted);
// let newDate = dateCompleted.replace('T', ' ').replace('Z', '');
// console.log('after conversion', newDate);
// let dateFormatted = newDate.slice(0, 10);
// let timeFormatted = newDate.slice(11, 16);
// console.log('just date', dateFormatted);
// console.log('just time', timeFormatted);
{/* <td>${item.isComplete != true ? `<strong>${item.text}</strong>` : `${item.text} --- ✅ at: ${timeFormatted} on ${dateFormatted}`}</td> */}
