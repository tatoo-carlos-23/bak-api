import { mysqlPool } from "@bk/config/database.config";
import type { ICheckAvailability, IListBookings } from "./bookings.types";

export const checkAvailability = async (
  date: string,
  scheduleId: number,
): Promise<ICheckAvailability | null> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT boo.id FROM bookings AS boo INNER JOIN schedules as sch ON sch.id = boo.schedule_id WHERE (? BETWEEN sch.start_date AND sch.end_date) AND boo.schedule_id = ? LIMIT 1;`,
    [date, scheduleId],
  );
  return Array.isArray(queryResult)
    ? (queryResult?.[0] as ICheckAvailability)
    : null;
};

export const create = async (
  scheduleId: number,
  userId: number,
  date: string,
) => {
  await mysqlPool.execute(
    `INSERT INTO bookings (schedule_id, client_id, status_id, start_time) VALUES (?, ?, 1, ?);`,
    [scheduleId, userId, date],
  );
};

export const getAll = async (userId: number): Promise<IListBookings[]> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT boo.id AS id, boo.status_id AS status_id, bta.description AS status_name, boo.start_time, boo.schedule_id AS schedule_id, ser.id AS service_id, ser.duration AS service_duration, sty.name AS service_type_name FROM bookings AS boo INNER JOIN schedules AS ach ON ach.id = boo.schedule_id INNER JOIN services AS ser ON ser.id = ach.service_id INNER JOIN service_types as sty ON sty.id = ser.type_id INNER JOIN booking_status as bta ON bta.id = boo.status_id WHERE boo.client_id = ?;`,
    [userId],
  );

  return Array.isArray(queryResult) ? (queryResult as IListBookings[]) : [];
};

export const bookingRepository = { checkAvailability, create, getAll };
