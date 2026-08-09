import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "./jwt.helper";
import type { IErrorHttp } from "@bk/error-http";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.header("authorization");

  if (!authorization) {
    return res.status(401).json({
      xMessage: "Token es requerido",
      xCode: "TOKEN_REQUIRED",
    } as IErrorHttp);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      xMessage: "Token inválido",
      xCode: "TOKEN_INVALID",
    } as IErrorHttp);
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json({
      xMessage: "Token inválido o expirado",
      xCode: "TOKEN_INVALID",
    } as IErrorHttp);
  }
};
