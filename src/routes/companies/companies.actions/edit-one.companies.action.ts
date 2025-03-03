import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { companyMethods } from "../../../DB/postgres/methods";
import { NotFound } from "../../../constants";
import { getUrlForRequest } from "../../../helpers/url.helper";
import { parseOne } from "../companies.service";
import { EHttpCode } from "../../../enums";

const logger = createLogger(module);

/**
 * PATCH /companies/:id
 * Эндпоинт редактирования данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function editOne(req: Request, res: Response) {
  logger.init("edit company");
  const { id } = req.params;
  const data = req.body;

  const company = await companyMethods.getOne(Number(id));
  if (!company) {
    throw new NotFound("Company not found");
  }

  const updated = await companyMethods.editOne(Number(id), data);

  const photoUrl = getUrlForRequest(req);
  res.status(EHttpCode.OK).json(parseOne(updated, photoUrl));
  logger.success();
}
