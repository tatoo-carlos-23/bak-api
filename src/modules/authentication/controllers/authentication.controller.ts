import { userRepository } from "@bk/repositories/users";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { authenticationService } from "../services";
import type { ILoginDto } from "../dtos";

export class AuthenticationController {
  login = async (req: Request, res: Response) => {
    const body = req.body as ILoginDto;
    const result = await authenticationService.login(body);
    res.json(result);
  };

  myInfo = async (req: Request, res: Response) => {
    const result = await authenticationService.myInfo(req.user.email);
    res.json(result);
  };
}
