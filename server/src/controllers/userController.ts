import { json } from "stream/consumers";

const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const badRequest = require("../errors/badRequest");
const unauthorized = require("../errors/unauthorized");
const generateToken = require("../config/generateToken");

//register
export const registerUser = async (
  req: {
    body: { name: string; email: string; password: string; picture: string };
  },
  res: {
    status: (arg0: number) => {
      (): string;
      new (): string;
      send: {
        (arg0: {
          id: string;
          name: string;
          email: string;
          password: string;
          token: string;
        }): void;
        new (): string;
      };
    };
  }
) => {
  try {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new badRequest("Please provide the required credentials");
    }

    const alreadyExists = await User.findOne({ email });

    if (!alreadyExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        picture,
      });

      if (user) {
        res.status(201).send({
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          token: await generateToken(user._id),
        });
        console.log(user);
      } else {
        throw new badRequest("something went wrong");
      }
    } else {
      throw new unauthorized("user already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

//login
export const loginUser = async (
  req: { body: { email: string; password: string } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: {
        (arg0: {
          id: string;
          name: string;
          email: string;
          picture: string;
          token: string;
        }): void;
        new (): any;
      };
      json: { (arg0: { message: string }): any; new (): any };
    };
  }
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      passwordMatch
        ? res.status(201).send({
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: await generateToken(user._id),
          })
        : res.status(401).json({ message: "wrong credentials" });
    } else {
      throw new unauthorized("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//api/user?search=enzyme
export const getAllUsers = async (
  req: { query: string; user: { _id: string } },
  res: { send: (arg0: any) => void }
) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = { registerUser, loginUser, getAllUsers };
