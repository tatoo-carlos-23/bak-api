import { mysqlPool } from "@bk/config/database.config";
import type { IListSchedules, ICheckDateInRange } from "./schedules.types";

const getAll = async (): Promise<IListSchedules[]> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT sch.id, BIN_TO_UUID(sch.uuid) AS uuid, sch.start_date, sch.end_date, sch.service_id, sty.id AS service_type_id, sty.name AS service_type_name FROM schedules AS sch INNER JOIN services as ser ON ser.id = sch.service_id INNER JOIN service_types as sty ON sty.id = ser.type_id`,
  );
  return Array.isArray(queryResult) ? (queryResult as IListSchedules[]) : [];
};

const checkDateInRange = async (
  date: string,
  scheduleId: number,
): Promise<ICheckDateInRange | null> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT sch.id AS id FROM  schedules AS sch WHERE (? BETWEEN sch.start_date AND sch.end_date) AND sch.id = ? LIMIT 1;`,
    [date, scheduleId],
  );
  return Array.isArray(queryResult)
    ? (queryResult?.[0] as ICheckDateInRange)
    : null;
};

export const scheduleRepository = { getAll, checkDateInRange };
