import { Request, Response } from "express";
import User from "../models/userModel";
import badRequest from "../errors/badRequest";
import unauthorized from "../errors/unauthorized";
import generateToken from "../utils/generateToken";
const bcrypt = require("bcryptjs");

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
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
        res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: await generateToken(user._id),
        });
      } else {
        throw new badRequest("Something went wrong");
      }
    } else {
      throw new unauthorized("User already exists");
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new unauthorized("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Wrong credentials" });
      throw new badRequest("Wrong credentials");
    }

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: await generateToken(user._id),
    });
    
  } catch (error: any) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getAllUsers = async (
  req: any,
  res: Response
) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
