const express = require("express");
const connectDb = require("./config/connectDb");
import dotenv from "dotenv";

dotenv.config();
const port = process.env.port || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extented: false }));
connectDb();

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
    res.send("Hello world");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
