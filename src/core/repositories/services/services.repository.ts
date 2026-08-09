import { mysqlPool } from "@bk/config/database.config";
import type { IListServices } from "./services.types";

export const getAll = async (): Promise<IListServices[]> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT ser.id, ser.type_id, sty.name as type_name, ser.price, ser.duration, ser.ranking_id, sra.name as ranking_name FROM services as ser INNER JOIN service_types as sty ON sty.id = ser.type_id INNER JOIN service_rankings as sra ON sra.id = ser.ranking_id WHERE ser.status_id = 'E';`,
  );
  return Array.isArray(queryResult) ? (queryResult as IListServices[]) : [];
};

export const serviceRepository = { getAll };
