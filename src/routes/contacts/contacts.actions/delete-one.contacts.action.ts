import { Request, Response } from "express";
import { createLogger } from "../../../services";
import { EHttpCode } from "../../../enums";
import { NotFound } from "../../../constants";
import { contactMethods } from "../../../DB/postgres/methods";
const logger = createLogger(module);

/**
 * GET /contacts/:id
 * Эндпоинт удаления контакта.
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function deleteOne(req: Request, res: Response) {
  logger.init("delete contact");
  const { id } = req.params;

  const contactDeleted = await contactMethods.deleteOne(Number(id));
  if (!contactDeleted) {
    throw new NotFound("Contact not found");
  }

  res.status(EHttpCode.OK).json(contactDeleted);
  logger.success();
}
