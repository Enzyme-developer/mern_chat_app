const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const badRequest = require("../errors/badRequest");
const unauthorized = require("../errors/unauthorized");
const generateToken = require("../config/generateToken");

const registerUser = async (
  req: { body: { name: string; email: string; password: string; pic: string } },
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
    const { name, email, password, pic } = req.body;

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
        pic,
      });

      if (user) {
        res.status(201).send({
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          token: generateToken(user._id),
        });
      } else {
        throw new badRequest("wrong credentials.");
      }
    } else {
      throw new unauthorized("unauthorized user");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (email && passwordMatch) {
    res.status(201).send(user);
  } else {
    throw new unauthorized("unauthorized user");
  }
};

export {};
module.exports = { registerUser, loginUser };