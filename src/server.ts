import http from "http";
import config from "./config";
import { app } from "./app";
import { createLogger } from "./services";
const logger = createLogger(module);

const PORT = config.app.port;
export function startServer() {
  http.createServer(app).listen(PORT, () => {
    logger.info(`App has been started on port ${PORT}...`);
  });
}
