import { Router } from "express";
import { servicesRouteV1 } from "./routes";

export const ServicesModule = () => {
  const router = Router();

  router.use(servicesRouteV1);

  return router;
};
