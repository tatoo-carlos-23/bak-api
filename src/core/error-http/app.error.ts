import type { IErrorHttp } from "./error.interface";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: IErrorHttp,
  ) {
    super(JSON.stringify(message));
    this.name = "AppError";
  }
}
