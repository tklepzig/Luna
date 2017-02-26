import express from "express";
import http from "http";
import socketIo from "socket.io";
import path from "path";

const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const socketIoServer = socketIo.listen(httpServer);

app.use("/", express.static(path.resolve(__dirname + "/../public")));

socketIoServer.on("connection", socket => {
    const clientIp = socket.request.connection.remoteAddress;
    console.log("Client connected:\t" + clientIp);
    socket.on("disconnect", () => {
        console.log("Client disconnected:\t" + clientIp);
    });

    //client functions
    socket.on("ping", pong => {
        pong();
    });

    socket.on("media-playPause", id => {
        socket.broadcast.emit("media-playPause", id);
    });

    socket.on("media-volumeUp", id => {
        socket.broadcast.emit("media-volumeUp", id);
    });

    socket.on("media-volumeDown", id => {
        socket.broadcast.emit("media-volumeDown", id);
    });

    socket.on("keyboard-pressKey", (id, key, modifiers) => {
        socket.broadcast.emit("keyboard-pressKey", id, key, modifiers);
    });

    socket.on("mouse-move", (id, offset) => {
        socket.broadcast.emit("mouse-move", id, offset);
    });

    socket.on("mouse-wheel", (id, delta) => {
        socket.broadcast.emit("mouse-wheel", id, delta);
    });

    socket.on("mouse-hWheel", (id, delta) => {
        socket.broadcast.emit("mouse-hWheel", id, delta);
    });

    socket.on("mouse-leftClick", id => {
        socket.broadcast.emit("mouse-leftClick", id);
    });

    socket.on("mouse-rightClick", id => {
        socket.broadcast.emit("mouse-rightClick", id);
    });

    socket.on("mouse-middleClick", id => {
        socket.broadcast.emit("mouse-middleClick", id);
    });
});


httpServer.listen(port, () => {
    console.log("listening on *:" + port);
});
