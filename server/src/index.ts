import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "http";
import connectDb from "./config/connectDb";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

dotenv.config();

const port = process.env.PORT || 5000;
const ENDPOINT = "localhost";
const app: Application = express();
const server: Server = new Server(app);

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});














//connect socket to server
const io = require("socket.io")(server, {
  pingTimeout: 5000,
  cors: {
    origin: [
      "http://localhost:3000"
    ],
  },
});

//on socket connection
io.on("connection", (socket: any) => {
  // console.log('connected to Socket.io')

  socket.on("setup", (userData: { id: string }) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("joinChat", (chat: { _id: string }) => {
    socket.join(chat._id);
  });


  socket.on("typing", (chat: any) => socket.in(chat).emit("typing"));
  socket.on("stop typing", (chat: any) => socket.in(chat).emit("stop typing"));


  socket.on("sendMessage", (newMessageReceived: any) => {
    if (!newMessageReceived.chat.users) {
      return console.log("chat.users is not defined");
    }

    newMessageReceived.chat.users.forEach((user: { _id: String }) => {
      // if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("messageReceived", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    // socket.leave(userData._id);
  });
});

export {};