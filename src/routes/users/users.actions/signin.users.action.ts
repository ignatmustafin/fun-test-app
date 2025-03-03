import { createLogger, JwtService } from "../../../services";
import { Request, Response } from "express";
import { IJwtUserPayload, IUserSignInPayload } from "../../../interfaces";
import { userMethods } from "../../../DB/postgres/methods/user";
import { EHttpCode } from "../../../enums";
import bcrypt from "bcrypt";
import { BadRequest } from "../../../constants";
import config from "../../../config";

const logger = createLogger(module);

/**
 * POST /user/signin
 * Эндпоинт для входа пользовтеля
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function signin(
  req: Request<{}, {}, IUserSignInPayload>,
  res: Response
) {
  logger.init("user signin");
  const { email, password } = req.body;

  const user = await userMethods.getOne(email);

  if (!user) {
    throw new BadRequest("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new BadRequest("Invalid email or password");
  }

  const tokenPayload: IJwtUserPayload = {
    id: String(user.id),
    username: user.full_name
  }

  const accessToken = new JwtService(config.jwt.access).encode(tokenPayload).data;
  const refreshToken = new JwtService(config.jwt.refresh).encode(tokenPayload).data;

  res.header("Authorization", `Bearer ${accessToken}`);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env.production,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.success();
  return res.status(EHttpCode.OK).json(user);
}
