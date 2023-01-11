const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");
const userRoutes = require("./routes/userRoutes");

const port = process.env.port;
const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extented: false }));

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello world");
});

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

export {};