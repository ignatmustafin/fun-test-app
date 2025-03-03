import { createLogger, JwtService } from "../../../services";
import { Request, Response } from "express";
import { EHttpCode } from "../../../enums";
import { Unauthorized } from "../../../constants";
import config from "../../../config";

const logger = createLogger(module);

/**
 * POST /user/token/refresh
 * Эндпоинт для обновления токена
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function refreshToken(req: Request, res: Response) {
  logger.init("refresh token");

  const existingRefreshToken = req.cookies.refreshToken;

  if (!existingRefreshToken) {
    throw new Unauthorized();
  }

  const tokenPayload = new JwtService(config.jwt.refresh).decode(
    existingRefreshToken
  ).payload;

  const newAccessToken = new JwtService(config.jwt.access).encode(
    tokenPayload
  ).data;
  const newRefreshToken = new JwtService(config.jwt.refresh).encode(
    tokenPayload
  ).data;

  res.header("Authorization", `Bearer ${newAccessToken}`);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: config.env.production,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.success();
  return res.status(EHttpCode.OK).json(true);
}
