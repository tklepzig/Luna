const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require('socket.io');

const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.Server(app);
const socketIoServer = socketIo(httpServer, {
    pingTimeout: 2000,
    pingInterval: 2000
});

socketIoServer.on('connection', socket => {
    const clientIp = socket.request.connection.remoteAddress;
    console.log('Client connected:\t' + clientIp);

    socket.on("keyboard-pressKey", (key, modifiers) => {
        socket.broadcast.emit("keyboard-pressKey", key, modifiers);
    });
});

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
