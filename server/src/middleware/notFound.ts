import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page does not Exist' });
};

export default notFound;
