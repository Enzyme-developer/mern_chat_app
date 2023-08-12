const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const protect = async (
  req:any,
  res: Response,
  next: NextFunction
) => {
  let token;

  const authHeader = req.headers.authorization;
  const bearerPrefix = "Bearer ";

  if (authHeader && authHeader.startsWith(bearerPrefix)) {
    try {
      token = authHeader.slice(bearerPrefix.length);

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
