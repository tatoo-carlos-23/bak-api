import type { Request, Response } from "express";
import { scheduleService } from "../services";

export class SchedulesController {
  getAll = async (_req: Request, res: Response) => {
    const result = await scheduleService.getAll();
    res.json(result);
  };
}
