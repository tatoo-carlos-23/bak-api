import { Router } from "express";
import { bookingsRouteV1 } from "./routes";

export const BookingsModule = () => {
  const router = Router();

  router.use(bookingsRouteV1);

  return router;
};
