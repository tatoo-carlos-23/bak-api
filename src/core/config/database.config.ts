import mysql, { type PoolOptions } from "mysql2/promise";

const options: PoolOptions = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const mysqlPool = mysql.createPool({ ...options });

export const checkDatabaseConnection = async () => {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.ping();
    console.log("\n\n");
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
    console.log("✅✅✅ MySQL conectado    🚀🚀🚀");
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
    console.log("\n\n");
  } finally {
    connection.release();
  }
};
