const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");

const port = process.env.port || 5000;
const app = express();
connectDb();

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello world");
});

app.use(express.json());
app.use(express.urlencoded({ extented: false }));

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

export {};
