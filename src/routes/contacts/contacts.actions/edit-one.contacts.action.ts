import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { contactMethods } from "../../../DB/postgres/methods";
import { NotFound } from "../../../constants";
import { EHttpCode } from "../../../enums";
const logger = createLogger(module);

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function editOne(req: Request, res: Response) {
  logger.init("edit contact");
  const { id } = req.params;
  const data = req.body;

  const contact = await contactMethods.getOne(Number(id));
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  const updated = await contactMethods.editOne(Number(id), data);

  res.status(EHttpCode.OK).json(updated);
  logger.success();
}
