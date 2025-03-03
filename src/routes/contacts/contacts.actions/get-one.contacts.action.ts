import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { EHttpCode } from "../../../enums";
import { NotFound } from "../../../constants";
import { contactMethods } from "../../../DB/postgres/methods";
const logger = createLogger(module);

/**
 * GET /contacts/:id
 * Эндпоинт получения данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function getOne(req: Request, res: Response) {
  logger.init("get contact");
  const { id } = req.params;

  const contact = await contactMethods.getOne(Number(id));
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  res.status(EHttpCode.OK).json(contact);
  logger.success();
}
