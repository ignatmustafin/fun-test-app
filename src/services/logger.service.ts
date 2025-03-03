import httpContext from "express-http-context";
import config from "../config";
import path from "path";
import log4js from "log4js";
const log4jsLogger = _configure();
const log4jsCombinedLogger = log4jsLogger.getLogger("combined");
const log4jsErrorLogger = log4jsLogger.getLogger("error");

const stack: any[] = [];

export function createLogger(callingModule: NodeJS.Module) {
  const parts = callingModule.filename.split(path.sep);
  const moduleFilename = parts[parts.length - 1];
  const moduleLabel =
    moduleFilename === "index.ts"
      ? parts[parts.length - 2]
      : parts[parts.length - 1];
  return {
    params: { module: moduleLabel, context: {} },
    init(str: any) {
      this.params.context = str;
      stack.push(this.params.context);
      log4jsCombinedLogger.info(_formatMessage(this.params, "started"));
    },
    info(message: string) {
      log4jsCombinedLogger.info(_formatMessage(this.params, message));
    },
    warn(message: string) {
      log4jsCombinedLogger.warn(_formatMessage(this.params, message));
    },
    error(message: string) {
      log4jsCombinedLogger.error(_formatMessage(this.params, message));
      log4jsErrorLogger.error(_formatMessage(this.params, message));
    },
    debug(message?: string) {
      if (config.log.debug) {
        log4jsCombinedLogger.debug(_formatMessage(this.params, message));
      }
    },
    success() {
      this.params.context = stack.pop() || [];
      log4jsCombinedLogger.info(_formatMessage(this.params, "succeed"));
    },
    shutdown(cb: any) {
      log4js.shutdown(cb);
    },
  };
}

function _formatMessage(params: any, message: any) {
  const reqMethod = httpContext.get("method");
  const reqPath = httpContext.get("path");
  const userId = httpContext.get("user");

  const messageArr = [
    ...(params.module ? [`[${params.module}]`] : []),
    ...(reqMethod ? [reqMethod] : []),
    ...(reqPath ? [reqPath] : []),
    ...(userId ? [userId] : []),
    ...(params.context && Object.keys(params.context).length > 0
      ? [`${JSON.stringify(params.context)}`]
      : []),
  ];

  if (config.log.debug && message instanceof Error) {
    messageArr.push(`${message.message} ${message.stack}`);
  } else if (message instanceof Error) {
    messageArr.push(message.message);
  } else {
    messageArr.push(message);
  }

  return messageArr.join(" ");
}

function _configure() {
  const logAppenders = {
    error: { type: "file", filename: config.log.errorlog },
    combined: { type: "file", filename: config.log.combined },
    ...(console && { console: { type: "console" } }),
  };

  const combinedAppenders = [
    "combined",
    ...(config.log.console ? ["console"] : []),
  ];

  log4js.configure({
    appenders: logAppenders,
    categories: {
      error: { appenders: ["error"], level: "ERROR" },
      combined: { appenders: combinedAppenders, level: "ALL" },
      default: { appenders: Object.keys(logAppenders), level: "ALL" },
    },
    disableClustering: true,
  });

  return log4js;
}
