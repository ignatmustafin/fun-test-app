import { Request, Response } from "express";
import { createLogger, imageService, postgresDb } from "../../../services";
import { companyMethods } from "../../../DB/postgres/methods";
import { BadRequest, NotFound } from "../../../constants";
import path from "path";
import crypto from "crypto";
import config from "../../../config";
import { castFileUrl, getFileUrl } from "../../../helpers/url.helper";
import { EHttpCode } from "../../../enums";
import { FileEntity } from "../../../DB/postgres/entities/file.entity";
import { CompanyEntity } from "../../../DB/postgres/entities/company.entity";
import { fileMethods } from "../../../DB/postgres/methods/files";

const logger = createLogger(module);

/**
 * POST /companies/:id/image
 * Эндпоинт добавления изображения компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
export async function addImage(req: Request, res: Response) {
  logger.init("add company image");
  const { id } = req.params;
  // @ts-ignore
  const file = req.files?.file[0];

  if (!file) {
    throw new BadRequest("File not found in payload");
  }

  const userId = Number(req.body.userId);

  const company = await companyMethods.getOne(Number(id));
  if (!company) {
    throw new NotFound("Company not found");
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileName = crypto.randomBytes(10).toString("hex");

  const uploadedFileName = fileName + fileExtension;
  const uploadedFileThumbName = `${fileName}_${config.images.thumbSize}x${config.images.thumbSize}${fileExtension}`;

  const tempFilePath = file.path;
  const targetFilePath = path.resolve(
    `${config.images.imagesDir}${userId}/${uploadedFileName}`
  );
  const targetThumbPath = path.resolve(
    `${config.images.imagesDir}${userId}/${uploadedFileThumbName}`
  );

  await imageService.resizeImage(tempFilePath, targetThumbPath);
  await imageService.renameImage(tempFilePath, targetFilePath);

  const uploadedImage: Omit<FileEntity, "id"> = {
    name: uploadedFileName,
    filepath: castFileUrl(targetFilePath),
    thumbpath: castFileUrl(targetThumbPath),
  };


  const newFile = await fileMethods.createOne(uploadedImage);
  await companyMethods.addOneImage(Number(id), newFile);

  res.status(EHttpCode.OK).json(uploadedImage);
  logger.success();
}
