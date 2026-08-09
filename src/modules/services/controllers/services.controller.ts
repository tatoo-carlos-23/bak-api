import type { Request, Response } from "express";
import { servicesService } from "../services";

export class ServicesController {
  getAll = async (_req: Request, res: Response) => {
    const result = await servicesService.getAll();
    res.json(result);
  };
}
