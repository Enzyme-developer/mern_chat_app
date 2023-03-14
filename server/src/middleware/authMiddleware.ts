const jwt = require("jsonwebtoken");
const User = require("../models/userModel.ts");

export const protect = async (
  req: { headers: { authorization: string }; user: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  },
  next: () => void
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
