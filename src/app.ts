import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import httpContext from "express-http-context";
import cors from "cors";
import { MainRouter } from "./routes";
import config from "./config";
import fs from "fs";
import cron from "node-cron";
import useragent from "express-useragent";
import swaggerUI from "swagger-ui-express";
import { EHttpCode } from "./enums";
import { errorsHandler } from "./middleware";
import { swaggerOptions } from "./config/swagger";

import { createLogger } from "./services";
const logger = createLogger(module);

export const app = express();

app.set("json replacer", (k: unknown, v: unknown) =>
  v === null ? undefined : v
);
app.disable("x-powered-by");
app.enable("trust proxy");

app.use(useragent.express());

// http context
app.use(httpContext.middleware);
app.use((req, res, next) => {
  const proto = req.headers[
    "x-forwarded-proto"
  ] /*|| req.socket.encrypted TODO property encrypted does not exist */
    ? "https"
    : "http";
  const url = `${proto}://${req.get("Host")}`;
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  httpContext.set("method", req?.method);
  httpContext.set("path", req?.url);
  httpContext.set("url", url);
  next();
});

if (config.env.dev) {
  // swagger
  const swaggerRoute = `/${config.app.prefix}/docs`;
  app.use(swaggerRoute, swaggerUI.serve, swaggerUI.setup(swaggerOptions));

  app.get(`/${config.app.prefix}/swagger.json`, (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(EHttpCode.OK).json(swaggerOptions);
  });

  logger.info(`For swagger doc visit: ${config.app.url}${swaggerRoute}`);
}

// log every request
app.use((req, res, next) => {
  logger.debug();
  next();
});

// cors
app.use(cors(config.cors));

// cookies
app.use(cookieParser());

// body parsing
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/static", express.static("public"));

app.use(express.json());

// routes
app.use(`/${config.app.prefix}/`, MainRouter);

// error handling
app.use(...errorsHandler);

if (!config.env.test) {
  cron.schedule("*/2 * * * *", () => {
    logger.init("schedule task - clear uploaded images");
    fs.rm("./public/images/", { recursive: true, force: true }, (err) => {
      if (err) {
        logger.error(err.message);
      }
      logger.success();
    });
  });
}
