const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./middleware/errorHandler")
const notFound = require("./middleware/notFound")

const port = process.env.port;
const app = express();
connectDb();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extented: true }))

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use(notFound)
app.use(errorHandler)

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello world");
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

export {};