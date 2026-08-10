import { bookingRepository } from "@bk/repositories/bookings";
import { AppError } from "@bk/error-http";
import type { JwtPayload } from "@bk/security";
import { listBookingMapper } from "../mappers/bookings.mapper";

const create = async (
  date: string,
  scheduleId: number,
  jwtPayload: JwtPayload,
) => {
  const booking = await bookingRepository.checkAvailability(date, scheduleId);

  if (booking) {
    throw new AppError(404, {
      xMessage: `No se encuntra disponible en la fecha y hora seleccionada`,
      xCode: "NOT_FOUND",
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
