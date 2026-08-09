import { Router } from "express";
import { authenticationRouteV1 } from "./routes";

export const AuthenticationModule = () => {
  const router = Router();

  router.use(authenticationRouteV1);

  return router;
};
