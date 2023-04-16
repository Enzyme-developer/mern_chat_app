import { Socket } from "dgram";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const port = process.env.port;
const ENDPOINT = "localhost";
const app = express();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extented: true }));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello world");
});

const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

//connect socket to server
const io = require("socket.io")(server, {
  pingTimeout: 5000,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3000/chat",
      "http://localhost:3000",
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
    console.log("user joined room " + chat._id);
  });

  socket.on("typing", (chat: any) => socket.in(chat).emit("typing"));
  socket.on("stop typing", (chat: any) => socket.in(chat).emit("stop typing"));

  socket.on("sendMessage", (newMessageReceived: any) => {
    if (!newMessageReceived.chat.users)
      return console.log("chat.users is not defined");

    newMessageReceived.chat.users.forEach((user: { _id: String }) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("messageReceived", newMessageReceived);
      console.log("sent");
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    // socket.leave(userData._id);
  });
});

export {};
