const app = require("express")();
const port = 4000;
const socket_port = 4001;
const io = require("socket.io")(socket_port);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`SocketIO connecting on port ${socket_port}`);
});

let clients_connected = 0;

io.on("connection", socket => {
  console.log(`New SocketIO client connected to ${socket_port}`);
  clients_connected += 1;
  console.log(`Clients connected: ${clients_connected}`);
  socket.on("disconnect", () => {
    console.log(`SocketIO client disconnected from ${socket_port}`);
    clients_connected -= 1;
    console.log(`Clients connected: ${clients_connected}`);
  });
});