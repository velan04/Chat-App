const { Server } = require("socket.io");
const { addUsers, removeUser, getUser } = require("./data");

let io;

const SocketHandler = (req, res) => {
    if (!io) {
        io = new Server(res.socket.server, {
            cors: {
                origin: "https://chat-room-gold.vercel.app",
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (socket) => {
            console.log("A user connected");

            socket.on("addItem", ({ name, room }, callBack) => {
                const { user, error } = addUsers({ id: socket.id, name, room });

                if (error) {
                    callBack(error);
                    return;
                }

                socket.join(user.room);

                socket.emit("message", {
                    user: "admin",
                    text: `${user.name}, welcome to the ${user.room}`,
                });

                socket.broadcast.to(user.room).emit("message", {
                    user: "admin",
                    text: `${user.name}, has joined!`,
                });
            });

            socket.on("sendMsg", (message, callBack) => {
                const user = getUser(socket.id);
                if (user) {
                    io.to(user.room).emit("message", {
                        user: user.name,
                        text: message,
                    });
                }
                callBack();
            });

            socket.on("disconnect", () => {
                const user = removeUser(socket.id);
                if (user) {
                    io.to(user.room).emit("message", {
                        user: "admin",
                        text: `${user.name} has left`,
                    });
                }
            });
        });

        console.log("Socket.io initialized");
    }
    res.end();
};

export default SocketHandler;
