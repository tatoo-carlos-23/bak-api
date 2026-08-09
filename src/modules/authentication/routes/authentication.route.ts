import { Router } from "express";
import { AuthenticationController } from "../controllers";
import { VERSION_API } from "@bk/constants/version-api.constant";
import { validateDtoBody } from "@bk/middlewares/validate-dto-body.middleware";
import { loginSchema } from "../dtos";
import { authMiddleware } from "@bk/security";

const router = Router();
const BASE_URL_V1 = `/${VERSION_API.V1}/authentication`;

const controller = new AuthenticationController();

router.post(
  `${BASE_URL_V1}/login`,
  validateDtoBody(loginSchema),
  controller.login,
);
router.get(`${BASE_URL_V1}/my-info`, authMiddleware, controller.myInfo);

export const authenticationRouteV1 = router;
