const jwt = require("jsonwebtoken");

const generateToken = async (id: string): Promise<string> => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export default generateToken;
