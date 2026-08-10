import type { Request, Response } from "express";
import { bookingsService } from "../services";
import type { IBookingBody } from "../dtos";

export class BookingsController {
  create = async (req: Request, res: Response) => {
    const body = req.body as IBookingBody;
    const result = await bookingsService.create(
      body.date,
      body.scheduleId,
      req.user,
    );
    res.json(result);
  };
  getAll = async (req: Request, res: Response) => {
    const result = await bookingsService.getAll(req.user);
    res.json(result);
  };
}
