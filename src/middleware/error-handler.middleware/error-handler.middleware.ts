import { MulterError } from "multer";
import {
  ApiError,
  InternalError,
  BadRequest,
  UnprocessableEntity,
} from "../../constants";
import { Request, Response, NextFunction } from "express";
import { createLogger } from "../../services";

const logger = createLogger(module);

export const errorsHandler = [
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      if (
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        logger.error(err.message);
      }
      if (err instanceof MulterError) {
        throw new UnprocessableEntity(err.message);
      } else if (!(err instanceof ApiError)) {
        if (
          typeof err === "object" &&
          "type" in err &&
          err.type === "entity.parse.failed"
        ) {
          throw new BadRequest();
        }
        throw new InternalError();
      }
      throw err;
    } else {
      next();
    }
  },
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const httpCode = err.http_code;
    const respCode = err.error_code;
    const respErrMessage = err.message;
    logger.error(
      `Request finished with code "${httpCode}" error "${respCode}"`
    );
    res.header("Content-Type", "application/json").status(httpCode).send({
      code: respCode,
      message: respErrMessage,
    });
  },
];
