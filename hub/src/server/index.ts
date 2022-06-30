import { resolve } from "path";
import express from "express";

const port = 8080;
const app = express();

app.use(express.static(resolve(__dirname, "..", "public")));
app.get("/*", (_, res) => {
  res.sendFile(resolve(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
