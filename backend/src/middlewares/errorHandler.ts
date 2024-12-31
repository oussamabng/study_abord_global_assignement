import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.message || "Internal Server Error");
  res.status(500).json({ error: err.message || "Internal Server Error" });
};
