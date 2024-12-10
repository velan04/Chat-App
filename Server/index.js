const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const {v4 : uuid} = require('uuid');
const cors = require('cors');


const app = express();
app.use(cors());
const server = http.createServer(app);

const socketIo = new Server(server, {
     cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'],
        Credential: true
    }
})

let todoList = [];

const nameSpace = socketIo.of('/todo');
nameSpace.on("connection", (socket) => {
    console.log('New Connection connected');
    socket.emit('Update', todoList);
    //Add socket
    socket.on('newItem', (item) => {
        const todoItem = {id: uuid(), value: item}
        todoList.push(todoItem);
        nameSpace.emit('Update', todoList);
    });
    //Update Socket
    socket.on('updateItem', (itemOb) => {
        const index = todoList.findIndex((item) => item.id === itemOb.id);
        if(index !== -1){
            todoList[index].value = itemOb.value;
            nameSpace.emit('Update', todoList);
        }
    });

    //delete socket
    socket.on('deleteItem', (id) => {
        todoList = todoList.filter((item) => item.id !== id);
        nameSpace.emit('Update', todoList);
    });

    socket.on('disconnect', () => {
        console.log('Connection disconnected');
    });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});