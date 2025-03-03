import { Unauthorized, ApiError } from "../../constants";
import { createLogger, JwtService } from "../../services";
import { NextFunction, Request, Response } from "express";
import config from "../../config";

const logger = createLogger(module);

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");
    if (!_isValidHeader(authHeader) || !_isValidHeaderValue(authHeader)) {
      throw new Unauthorized();
    }
    const token = authHeader.split(" ").pop() ?? "";

    // проверяет и расшифровывает токен авторизации
    const { id } = new JwtService(config.jwt.access).decode(token).payload;
    req.user = { id };
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
    ) {
      logger.error(err.message);
    }
    let error;
    if (err instanceof ApiError) {
      error = err;
    } else {
      error = new Unauthorized();
    }
    return res.status(error.http_code).json({
      code: error.error_code,
      message: error.message,
    });
  }
  return next();
}

function _isValidHeader(header: unknown) {
  return typeof header === "string";
}

function _isValidHeaderValue(header: string) {
  return header.match(/(^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$)/gi);
}
