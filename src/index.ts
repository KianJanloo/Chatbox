import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    const { id } = socket;
    console.log(`▫️  User { ${id} } connected ▫️`)

    socket.on("join", (data) => {
        const { room } = data;
        socket.join(room)
        console.log(` 🟢 User { ${id} } join the room ${room} 🟢 `)
    })

    socket.on("sendMessage", (data) => {
        const { room } = data;
        io.to(room).emit(`message`, data);
    })

    socket.on("leave", (data) => {
        const { room } = data;
        socket.leave(room)
        console.log(` 🔴 User { ${id} } leave the room ${room} 🔴 `)
    })

    socket.on("disconnect", () => {
        console.log(`🔺  User { ${id} } disconnected ▫🔺`)
    })
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log("🔵 Server has started at the moment")
})