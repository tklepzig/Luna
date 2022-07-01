import { resolve } from "path";
import http from "http";
import express, { json, urlencoded } from "express";
import { Server } from "socket.io";
import cors from "cors";

const port = 8080;
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const httpServer = http.createServer(app);
const socketIoServer = new Server(httpServer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clients: any[] = [];
socketIoServer.on("connection", (socket) => {
  const clientIp = socket.request.connection.remoteAddress;
  // tslint:disable-next-line:no-console
  console.log(`Client connected:\t${clientIp}`);

  // tslint:disable-next-line:no-console
  socket.on("disconnect", () =>
    console.log(`Client disconnected:\t${clientIp}`)
  );
  //socket.on("ping", (pong) => pong());

  //socket.on("media-playPause", (id) =>
  //socket.broadcast.emit("media-playPause", id)
  //);
  //socket.on("media-volumeUp", (id) =>
  //socket.broadcast.emit("media-volumeUp", id)
  //);
  //socket.on("media-volumeDown", (id) =>
  //socket.broadcast.emit("media-volumeDown", id)
  //);
  socket.on(
    "keyboard-pressKey",
    (id, key, modifiers) => {
      console.dir(`press key: ${id}, ${key}, ${modifiers}`);

      clients.forEach((client) => {
        client.response.write(
          `event: keyboard-pressKey\ndata: ${JSON.stringify({
            id,
            key,
            modifiers,
          })}\n\n`
        );
      });
    }

    //socket.broadcast.emit("keyboard-pressKey", id, key, modifiers)
  );
  //socket.on("mouse-move", (id, offset) =>
  //socket.broadcast.emit("mouse-move", id, offset)
  //);
  //socket.on("mouse-wheel", (id, delta) =>
  //socket.broadcast.emit("mouse-wheel", id, delta)
  //);
  //socket.on("mouse-hWheel", (id, delta) =>
  //socket.broadcast.emit("mouse-hWheel", id, delta)
  //);
  //socket.on("mouse-leftClick", (id) =>
  //socket.broadcast.emit("mouse-leftClick", id)
  //);
  //socket.on("mouse-rightClick", (id) =>
  //socket.broadcast.emit("mouse-rightClick", id)
  //);
  //socket.on("mouse-middleClick", (id) =>
  //socket.broadcast.emit("mouse-middleClick", id)
  //);
});

app.get("/blubb", (request, response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);
  response.write("retry: 10000\n\n");

  const clientId = Date.now();
  response.write(`event: welcome\ndata: ${JSON.stringify({ clientId })}\n\n`);
  console.dir(`New client connected: ${clientId}`);
  clients.push({
    id: clientId,
    response,
  });

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    //clients = clients.filter((client) => client.id !== clientId);
  });
});

app.use(express.static(resolve(__dirname, "..", "public")));
app.get("/*", (_, res) => {
  res.sendFile(resolve(__dirname, "..", "public", "index.html"));
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
