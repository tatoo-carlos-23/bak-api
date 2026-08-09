import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import type { IErrorHttp } from "../error-http/error.interface";

export const validateDtoBody = <T>(schema: ZodType<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const errorData = {
        xCode: "ERROR-BODY",
        xMessage: "La información es incorrecta",
        xUrl: req.url,
      } as IErrorHttp;

      if (req?.traceId) {
        errorData.xTraceId = req.traceId;
      }

      return res.status(400).json({ ...errorData });
    }
    req.body = result.data;
    next();
  };
};
