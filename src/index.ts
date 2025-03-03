import { createLogger } from "./services";
import { startServer } from "./server";
import { postgresDb } from "./services";
import { ApiError } from "./constants";

const logger = createLogger(module);
(async () => {
  try {
    logger.info(`NODE ENV: ${process.env.NODE_ENV}`);
    // todo: разкомментировать для работы с БД
    await postgresDb.connect();
    if (!postgresDb.connection) {
      throw new ApiError("Missing connection to Postgres database");
    }
    startServer();
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message === "string"
    )
      logger.error(error.message);
    // todo: разкомментировать для работы с БД
    await postgresDb.disconnect();
    logger.shutdown(() => process.exit(1));
  }
})();

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, async () => {
    // todo: разкомментировать для работы с БД
    await postgresDb.disconnect();

    logger.info(`Caught signal ${signal}`);
    logger.shutdown(() => process.exit(0));
  })
);

process.on("uncaughtException", async (error) => {
  // todo: разкомментировать для работы с БД
  await postgresDb.disconnect();
  logger.error(`Uncaught exception! ${error.message}`);
  logger.shutdown(() => process.exit(1));
});
