import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  res.send(req.body);
};
