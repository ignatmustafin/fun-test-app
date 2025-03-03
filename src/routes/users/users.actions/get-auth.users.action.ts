import { Request, Response } from "express";
import { createLogger, JwtService } from "../../../services";
import config from "../../../config";
import { NotFound } from "../../../constants";
import { IJwtUserPayload } from "../../../interfaces";
import { EHttpCode } from "../../../enums";

const logger = createLogger(module);

/**
 * @todo: Предполагается к удалению по факту реализации требований тестового задания.
 * GET /user/auth
 * Служебный эндпоинт для получения токена авторизации произвольного пользователя.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function getAuth(
  req: Request,
  res: Response
) {
  logger.init("get user auth");
  const { user } = req.query as unknown as {user: IJwtUserPayload};

  if (!user) {
    throw new NotFound("User payload not found in request");
  }

  const token = new JwtService(config.jwt.access).encode(user).data;

  res.header("Authorization", `Bearer ${token}`);
  logger.success();
  return res.status(EHttpCode.OK).json(user);
}
