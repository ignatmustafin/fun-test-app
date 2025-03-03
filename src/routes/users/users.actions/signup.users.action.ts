import { createLogger, JwtService } from "../../../services";
import { Request, Response } from "express";
import { IUserSignUpPayload } from "../../../interfaces";
import { EHttpCode } from "../../../enums";
import { userMethods } from "../../../DB/postgres/methods/user";

const logger = createLogger(module);

/**
 * POST /user/signup
 * Эндпоинт для регистрации пользователя (добавления объекта user в БД)
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function signup(
  req: Request<{}, {}, IUserSignUpPayload>,
  res: Response
) {
  logger.init("user signup");

  const user = await userMethods.createOne(req.body);

  logger.success();
  return res.status(EHttpCode.OK).json(user);
}
