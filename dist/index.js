"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    const { id } = socket;
    console.log(`▫️  User { ${id} } connected ▫️`);
    socket.on("join", (data) => {
        const { room } = data;
        socket.join(room);
        console.log(` 🟢 User { ${id} } join the room ${room} 🟢 `);
    });
    socket.on("sendMessage", (data) => {
        const { room } = data;
        io.to(room).emit(`message`, data);
    });
    socket.on("leave", (data) => {
        const { room } = data;
        socket.leave(room);
        console.log(` 🔴 User { ${id} } leave the room ${room} 🔴 `);
    });
    socket.on("disconnect", () => {
        console.log(`🔺  User { ${id} } disconnected ▫🔺`);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("🔵 Server has started at the moment");
});
