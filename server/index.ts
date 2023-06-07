import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const PORT = 4000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", socket.id);
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
