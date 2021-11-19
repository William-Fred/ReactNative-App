const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const port = 3000;


io.on("connection", (socket) => {
  console.log("connected to server")
  socket.on("chat message", message =>{
      console.log(message)
      io.emit("chat message", message);
  })
});

httpServer.listen(port, () => console.log("server running at " + port));

