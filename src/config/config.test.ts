import { GlobalConfig } from "./config.global";
import path from "path";

export const TestConfig = GlobalConfig;

TestConfig.env.test = true;

TestConfig.dbs.postgres.DB_ENTITIES_PATH = path.resolve(
  "build/DB/postgres/entities/**/*.js"
);
TestConfig.dbs.postgres.DB_MIGRATIONS_PATH = path.resolve(
  "build/DB/postgres/migrations/**/*.js"
);

TestConfig.log.console = true;
TestConfig.log.debug = true;
