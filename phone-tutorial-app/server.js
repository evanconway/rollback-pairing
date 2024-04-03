const express = require("express");
const http = require("http");
const path = require("path");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/myapp",
  ssl: {},
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

// app.get("/manifest.json", (request, response) => {
//   response.sendFile(`${__dirname}/manifest.json`);
// });

server.listen(port);
console.log(`Listening on: ${port}`);
