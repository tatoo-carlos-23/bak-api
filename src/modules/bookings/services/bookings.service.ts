import { bookingRepository } from "@bk/repositories/bookings";
import { AppError } from "@bk/error-http";
import type { JwtPayload } from "@bk/security";
import { listBookingMapper } from "../mappers/bookings.mapper";
import { scheduleRepository } from "@bk/repositories/schedules";

const create = async (
  date: string,
  scheduleId: number,
  jwtPayload: JwtPayload,
) => {
  const dateInRange = await scheduleRepository.checkDateInRange(
    date,
    scheduleId,
  );

  if (!dateInRange) {
    throw new AppError(404, {
      xMessage: `La fecha no se encuentra en el rango permitido del horario`,
      xCode: "ERROR_RANGE",
    });
  }

  const bookingAvailability = await bookingRepository.checkAvailability(
    date,
    scheduleId,
  );

  if (bookingAvailability) {
    throw new AppError(404, {
      xMessage: `La hora y fecha seleccionada ya se encuentra ocupada.`,
      xCode: "NOT_AVAILABLE",
    });
  }

  await bookingRepository.create(scheduleId, jwtPayload.id, date);

  return;
};

const getAll = async (jwtPayload: JwtPayload) => {
  const list = await bookingRepository.getAll(jwtPayload.id);
  return { data: listBookingMapper(list) };
};

export const bookingsService = { create, getAll };
