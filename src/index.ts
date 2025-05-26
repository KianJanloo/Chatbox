import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import logger from './logger';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    const { id } = socket;
    logger.info(`▫️  User { ${id} } connected ▫️`)

    socket.on("join", (data) => {
        const { room } = data;
        socket.join(room)
        logger.info(` 🟢 User { ${id} } join the room ${room} 🟢 `)
    })

    socket.on("sendMessage", (data) => {
        const { room } = data;
        io.to(room).emit(`message`, { ...data });
        logger.info(` ▫️ new Message from { ${id} }: (${data.message}) ▫️ `)
    })

    socket.on("leave", (data) => {
        const { room } = data;
        socket.leave(room)
        logger.info(` 🔴 User { ${id} } leave the room ${room} 🔴 `)
    })

    socket.on("disconnect", () => {
        logger.info(`🔺  User { ${id} } disconnected ▫🔺`)
    })
})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    logger.info(`🔵 Server has started at the moment on port ${PORT}`)
})