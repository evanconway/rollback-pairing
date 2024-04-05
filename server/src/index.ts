import express from "express";
import http from "http";
import path from "path";
import { ExpressPeerServer } from "peer";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  //debug: true,
  path: "/myapp",
  //ssl: undefined,
});

app.use(peerServer);

const staticFileDir = '../../client/dist';
app.use(express.static(path.join(__dirname, staticFileDir)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, staticFileDir, '/index.html'));
});

app.get('hello', (req, res) => {
    res.send('hello world');
});

server.listen(port);
console.log(`app runnin at http://localhost:${port}`);

