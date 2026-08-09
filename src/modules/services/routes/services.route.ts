import { Router } from "express";
import { ServicesController } from "../controllers";
import { VERSION_API } from "@bk/constants/version-api.constant";
import { authMiddleware } from "@bk/security";

const router = Router();
const BASE_URL_V1 = `/${VERSION_API.V1}/services`;

const controller = new ServicesController();

router.get(`${BASE_URL_V1}`, authMiddleware, controller.getAll);

export const servicesRouteV1 = router;
