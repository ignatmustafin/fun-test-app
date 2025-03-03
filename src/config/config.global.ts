import path from "path";
import { IConfig } from "../interfaces";

export const GlobalConfig: IConfig = {
  app: {
    port: 2114,
    prefix: "v1",
    url: "http://localhost:2114",
  },

  env: {
    dev: false,
    test: false,
    production: false,
  },

  dbs: {
    postgres: {
      POSTGRES_PASSWORD: "admin",
      POSTGRES_DB: "api_test",
      POSTGRES_USER: "admin",
      POSTGRES_HOST: process.env.DB_HOST || "localhost",
      POSTGRES_PORT: 5432,
    },
  },

  log: {
    errorlog: path.resolve("log/errors.log"),
    combined: path.resolve("log/combined.log"),
    console: false,
    debug: false,
  },

  cors: {
    credentials: true,
    origin: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count", "Content-Type", "Authorization"],
  },

  jwt: {
    access: {
      secretKey: "",
      sign: {
        issuer: "Test API js backend",
        audience: "",
      },
      verify: {
        maxAge: 604800,
      },
    },
    refresh: {
      secretKey: "",
      sign: {
        issuer: "Test API js backend",
        audience: "",
      },
      verify: {
        maxAge: 604800,
      },
    }
  },

  images: {
    uploadsDir: "./uploads",
    imagesDir: "public/images/",
    thumbSize: 160,
  },
};
