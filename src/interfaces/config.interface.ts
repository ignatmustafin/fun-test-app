import { IJwtConfig } from "./jwt.interface";

export interface IConfig {
  app: {
    port: number;
    prefix: string;
    url: string;
  };

  env: {
    dev: boolean;
    test: boolean;
    production: boolean;
  };

  dbs: {
    postgres: {
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      DB_ENTITIES_PATH?: string;
      DB_MIGRATIONS_PATH?: string;
    };
  };

  log: {
    errorlog: string;
    combined: string;
    console: boolean;
    debug: boolean;
  };

  cors: {
    credentials: boolean;
    origin: boolean;
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"];
    allowedHeaders: ["Content-Type", "Authorization"];
    exposedHeaders: ["X-Total-Count", "Content-Type", "Authorization"];
  };

  jwt: {
    access: IJwtConfig;
    refresh: IJwtConfig;
  };

  images: {
    uploadsDir: string;
    imagesDir: string;
    thumbSize: number;
  };
}
