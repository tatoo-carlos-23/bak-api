import { Router } from "express";
import { SchedulesController } from "../controllers";
import { VERSION_API } from "@bk/constants/version-api.constant";
import { authMiddleware } from "@bk/security";

const router = Router();
const BASE_URL_V1 = `/${VERSION_API.V1}/schedules`;

const controller = new SchedulesController();

router.get(`${BASE_URL_V1}`, authMiddleware, controller.getAll);

export const schedulesRouteV1 = router;
