import { resolve } from "path";
import http from "http";
import express, { json, urlencoded } from "express";
import cors from "cors";

const port = 8080;
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const httpServer = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clients: any[] = [];

app.post("/key", ({ body: { id, key, modifiers } }, response) => {
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

  response.sendStatus(200);
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
