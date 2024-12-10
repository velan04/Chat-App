const socket =  io('http://localhost:3000/todo');

const todoItemInput = document.getElementById('todoItemInput');
const addTodo = document.getElementById('addTodo');
const todoList =  document.getElementById('todoItems');
const validation = document.getElementById('validation');

socket.on('Update', (todoItems) => {
    todoItemInput.onkeydown = handleEnterKey;
    todoList.innerHTML = '';
    todoItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item.value;
        li.classList = "w-1/2 flex  items-center border border-gray-100 py-2 shadow-md p-3 ";

        const editBtn = document.createElement('button');
        editBtn.classList = 'ml-40'
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>`;  
        editBtn.onclick = () => {
            updateItem(item);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>`
        deleteBtn.onclick = () => {
            deleteItem(item.id);
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li); 
    });
    console.log(todoItems);
});

addTodo.onclick = addItem;
function addItem() {
    const input = todoItemInput.value;
    if(input){
        document.getElementById('validation').innerHTML = '';
        socket.emit('newItem', input);
    }
    else{
        document.getElementById('validation').innerHTML = 'Please enter a valid todo item   ';
    }
}

function handleEnterKey(event) {
    if(event.key === 'Enter'){
        addItem();
        todoItemInput.value = '';
    }
}

function updateItem(item) {

    const updatedItem = prompt('Enter updated item:', item.value);
    if(updatedItem){
        socket.emit('updateItem', {id: item.id, value: updatedItem});
    }
}

function deleteItem(id) {
    socket.emit('deleteItem', id);
}