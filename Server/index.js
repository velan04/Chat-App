const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {addUsers} = require('./data');
const {removeUser} = require('./data');
const {getUser} = require('./data');

//instance
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin:[ 'https://chat-app-black-mu-83.vercel.app',
            'https://chat-28tp50d07-velans-projects.vercel.app'
        ],
        methods: ['GET', 'POST']
    }
});
const port = 8000;

//http method
app.get('/', (req, res) => {
    res.json('world')
});

//Socket 
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('addItem', ({name, room}, callBack) => {
        console.log(name, room);
        const {user, error} = addUsers({id: socket.id, name, room});

        console.log(user)

        if(error) {
            callBack(error)
            return
        }

        socket.join(user.room);

        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, welcome to the ${user.room}`
        });

        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name}, has joined!`
        });
    })

     socket.on('sendMsg', (message,  callBack) => {
        const user = getUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', {
            user: user.name,
            text: message })  
        }
            callBack()
     })

    socket.on('disconnect', () => {
        console.log('User disconnect')
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {
                user: 'admin',
                text: `${user.name} has left`
            })
        }
    })

})

//Run server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})