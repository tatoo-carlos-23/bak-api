import { mysqlPool } from "@bk/config/database.config";
import type { IListSchedules } from "./schedules.types";

export const getAll = async (): Promise<IListSchedules[]> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT sch.id, BIN_TO_UUID(sch.uuid) AS uuid, sch.start_date, sch.end_date, sch.service_id, sty.id AS service_type_id, sty.name AS service_type_name FROM schedules AS sch INNER JOIN services as ser ON ser.id = sch.service_id INNER JOIN service_types as sty ON sty.id = ser.type_id`,
  );
  return Array.isArray(queryResult) ? (queryResult as IListSchedules[]) : [];
};

export const scheduleRepository = { getAll };
