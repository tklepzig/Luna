import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as socketIo from "socket.io";

const port = process.env.PORT || 8080;
const app: any = express();
const httpServer = http.createServer(app);
const socketIoServer = socketIo.listen(httpServer);

socketIoServer.on("connection", (socket) => {
    const clientIp = socket.request.connection.remoteAddress;
    // tslint:disable-next-line:no-console
    console.log(`Client connected:\t${clientIp}`);

    // tslint:disable-next-line:no-console
    socket.on("disconnect", () => console.log(`Client disconnected:\t${clientIp}`));
    socket.on("ping", (pong) => pong());

    socket.on("media-playPause", (id) => socket.broadcast.emit("media-playPause", id));
    socket.on("media-volumeUp", (id) => socket.broadcast.emit("media-volumeUp", id));
    socket.on("media-volumeDown", (id) => socket.broadcast.emit("media-volumeDown", id));
    // tslint:disable-next-line:max-line-length
    socket.on("keyboard-pressKey", (id, key, modifiers) => socket.broadcast.emit("keyboard-pressKey", id, key, modifiers));
    socket.on("mouse-move", (id, offset) => socket.broadcast.emit("mouse-move", id, offset));
    socket.on("mouse-wheel", (id, delta) => socket.broadcast.emit("mouse-wheel", id, delta));
    socket.on("mouse-hWheel", (id, delta) => socket.broadcast.emit("mouse-hWheel", id, delta));
    socket.on("mouse-leftClick", (id) => socket.broadcast.emit("mouse-leftClick", id));
    socket.on("mouse-rightClick", (id) => socket.broadcast.emit("mouse-rightClick", id));
    socket.on("mouse-middleClick", (id) => socket.broadcast.emit("mouse-middleClick", id));
});

app.use(express.static(path.resolve(`${__dirname}/../public`)));
app.get("*", (req: any, res: any) => res.sendFile(path.resolve(`${__dirname}/../public/index.html`)));

// tslint:disable-next-line:no-console
app.listen(8080, () => console.log("listening on *:8080"));
