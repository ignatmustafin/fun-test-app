import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { companyMethods } from "../../../DB/postgres/methods";
import { NotFound } from "../../../constants";
import { getUrlForRequest } from "../../../helpers/url.helper";
import { EHttpCode } from "../../../enums";
import { parseOne } from "../companies.service";

const logger = createLogger(module);

/**
 * GET /companies/:id
 * Эндпоинт получения данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function getOne(req: Request, res: Response) {
  logger.init("get company");
  const { id } = req.params;

  const company = await companyMethods.getOne(Number(id));
  if (!company) {
    throw new NotFound("Company not found");
  }

  res.status(EHttpCode.OK).json(company);
  logger.success();
}
