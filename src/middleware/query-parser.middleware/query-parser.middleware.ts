import { BadRequest } from "../../constants";
import { NextFunction, Request, Response } from "express";
import { createLogger } from "../../services";

const logger = createLogger(module);

export function parseJson(fieldNames: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const fieldName of fieldNames) {
      if (typeof req.query[fieldName] !== "string") {
        continue;
      }
      try {
        req.query[fieldName] = JSON.parse(req.query[fieldName]);
      } catch (error) {
        logger.error(`Incorrect JSON in request query field: ${fieldName}`);
        return next(new BadRequest());
      }
    }

    return next();
  };
}
