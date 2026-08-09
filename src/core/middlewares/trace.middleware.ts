import type { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

export const traceIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const traceId = req.header("x-trace-id") ?? uuid();
  req.traceId = traceId;
  res.setHeader("x-trace-id", traceId);
  next();
};
