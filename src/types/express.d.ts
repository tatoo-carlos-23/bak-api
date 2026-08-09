import type { JwtPayload } from "@bk/security";

declare global {
  namespace Express {
    interface Request {
      traceId: string;
      user: JwtPayload;
    }
  }
}

export {};
