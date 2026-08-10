import { bookingRepository } from "@bk/repositories/bookings";
import { AppError } from "@bk/error-http";
import type { JwtPayload } from "@bk/security";

const create = async (
  date: string,
  scheduleId: number,
  jwtPayload: JwtPayload,
) => {
  const booking = await bookingRepository.checkAvailability(date, scheduleId);

  if (booking) {
    throw new AppError(404, {
      xCode: `No se encuntra disponible en la fecha y hora seleccionada`,
      xMessage: "NOT_FOUND",
    });
  }

  await bookingRepository.create(scheduleId, jwtPayload.id, date);

  return;
};

const getAll = async (jwtPayload: JwtPayload) => {
  const data = await bookingRepository.getAll(jwtPayload.id);
  return { data };
};

export const bookingsService = { create, getAll };
