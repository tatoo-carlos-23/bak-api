import { Router } from "express";
import { BookingsController } from "../controllers";
import { VERSION_API } from "@bk/constants/version-api.constant";
import { authMiddleware } from "@bk/security";
import { validateDtoBody } from "@bk/middlewares/validate-dto-body.middleware";
import { bookingSchema } from "../dtos";

const router = Router();
const BASE_URL_V1 = `/${VERSION_API.V1}/bookings`;

const controller = new BookingsController();

router.post(
  `${BASE_URL_V1}`,
  authMiddleware,
  validateDtoBody(bookingSchema),
  controller.create,
);

router.get(`${BASE_URL_V1}`, authMiddleware, controller.getAll);

export const bookingsRouteV1 = router;
