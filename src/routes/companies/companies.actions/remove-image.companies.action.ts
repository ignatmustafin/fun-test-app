import { Request, Response } from "express";
import { createLogger, imageService, postgresDb } from "../../../services";
import { NotFound } from "../../../constants";
import { FileEntity } from "../../../DB/postgres/entities/file.entity";
import { EHttpCode } from "../../../enums";
import { fileMethods } from "../../../DB/postgres/methods/files";

const logger = createLogger(module);

/**
 * DELETE /companies/:id/image
 * Эндпоинт удаления изображения компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function removeImage(req: Request, res: Response) {
  logger.init("remove company image");
  const { id } = req.params;

  const file = await fileMethods.getOne(Number(id));

  if (!file) {
    throw new NotFound("File not found");
  }

  await imageService.removeImage(file.filepath);
  if (file.thumbpath) {
    await imageService.removeImage(file.thumbpath);
  }

  const fileDeleted = await fileMethods.deleteOne(Number(id));

  res.status(EHttpCode.OK).json(fileDeleted);
  logger.success();
}
