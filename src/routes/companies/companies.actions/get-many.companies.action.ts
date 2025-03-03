import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { companyMethods } from "../../../DB/postgres/methods";
import { EHttpCode } from "../../../enums";
import { IGetAllCompaniesOptionsPayload } from "../../../interfaces";

const logger = createLogger(module);

/**
 * GET /companies/all
 * Эндпоинт получения компаний
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function getMany(req: Request, res: Response) {
  logger.init("get companies");

  const companies = await companyMethods.getMany(
    req.query as unknown as IGetAllCompaniesOptionsPayload
  );
  res.status(EHttpCode.OK).json(companies);
  logger.success();
}
