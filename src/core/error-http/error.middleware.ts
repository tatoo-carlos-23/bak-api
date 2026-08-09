import type { ErrorRequestHandler } from "express";
import { AppError } from "./app.error";
import { getError } from "./generate-error.error";
import type { IErrorHttp } from "./error.interface";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    const errorData = getError(error.message);
    return res.status(error.statusCode).json({
      ...errorData,
      xTraceId: req?.traceId ?? "",
      xUrl: req.url,
    } as IErrorHttp);
  }

  return res.status(500).json({
    xCode: "CODE-GENERIC",
    xMessage: "Ocurrió un error intente de nuevo si desea",
    xTraceId: req.traceId ?? "",
    xUrl: req.url,
  } as IErrorHttp);
};
