import { GlobalConfig } from "./config.global";
import path from "path";

export const DevConfig = GlobalConfig;

DevConfig.env.dev = true;

DevConfig.dbs.postgres.DB_ENTITIES_PATH = path.resolve(
  "src/DB/postgres/entities/**/*.ts"
);
DevConfig.dbs.postgres.DB_MIGRATIONS_PATH = path.resolve(
  "src/DB/postgres/migrations/**/*.ts"
);

DevConfig.jwt.access.secretKey = "secretKey";
DevConfig.jwt.access.sign.audience = "http://localhost:2114";
DevConfig.jwt.access.verify.maxAge = "1h";

DevConfig.jwt.refresh.secretKey = "secretRefreshKey";
DevConfig.jwt.refresh.sign.audience = "http://localhost:2114";
DevConfig.jwt.refresh.verify.maxAge = "1d";

DevConfig.log.console = true;
DevConfig.log.debug = true;
