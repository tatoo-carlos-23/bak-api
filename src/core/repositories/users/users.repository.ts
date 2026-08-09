import { mysqlPool } from "@bk/config/database.config";
import type { IByEmailAndIsClient } from "./users.types";

export const getByEmailAndIsClient = async (
  email: string,
): Promise<IByEmailAndIsClient | null> => {
  const [queryResult] = await mysqlPool.execute(
    `SELECT usr.id as id, per.email, per.password, per.names, per.last_names, per.accepts_terms, per.accept_privacy_terms FROM users as usr INNER JOIN persons as per ON per.id = usr.person_id WHERE per.email = ? AND usr.rol_id = 'C' AND usr.status_id = 'E' LIMIT 1;`,
    [email],
  );
  return Array.isArray(queryResult)
    ? (queryResult?.[0] as IByEmailAndIsClient)
    : null;
};

export const userRepository = { getByEmailAndIsClient };
