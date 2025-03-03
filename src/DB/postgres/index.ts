import { DataSourceOptions } from "typeorm";
import config from "../../config";

export const dbConnectionConfig: DataSourceOptions = {
  type: "postgres",
  host: config.dbs.postgres.POSTGRES_HOST,
  port: config.dbs.postgres.POSTGRES_PORT,
  username: config.dbs.postgres.POSTGRES_USER,
  password: config.dbs.postgres.POSTGRES_PASSWORD,
  database: config.dbs.postgres.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [config.dbs.postgres.DB_ENTITIES_PATH!],
  migrations: [config.dbs.postgres.DB_MIGRATIONS_PATH!],
  ssl: false,
};