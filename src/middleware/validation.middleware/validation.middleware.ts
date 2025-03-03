import { validationResult } from "express-validator";
import { UnprocessableEntity } from "../../constants";
import { NextFunction, Request, Response } from "express";

import { createLogger } from "../../services";
const logger = createLogger(module);

export const ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorsToLog: string[] = [];
    const errorsToReturn: string[] = [];
    validationErrors.array().forEach((error) => {
      if (error.msg?.message) {
        errorsToReturn.push(error.msg?.message);
      }

      errorsToLog.push(
        `${error.msg?.message ? error.msg.message : error.msg} ${
          error.param
        } ${JSON.stringify(error.value)}`
      );
    });
    logger.error(errorsToLog.join(", "));
    const errorMsg = errorsToReturn.length
      ? errorsToReturn.join(",")
      : undefined;
    throw new UnprocessableEntity(errorMsg);
  }
  next();
};
