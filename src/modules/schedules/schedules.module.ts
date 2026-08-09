import { Router } from "express";
import { schedulesRouteV1 } from "./routes";

export const SchedulesModule = () => {
  const router = Router();

  router.use(schedulesRouteV1);

  return router;
};
