import multer from "multer";
import config from "../../config";
import { Router } from "express";
import { companyValidators } from "./companies.validator";
import { companyActions } from "./companies.actions";
import { parseJson } from "../../middleware";

const fileHandler = multer({ dest: config.images.uploadsDir });

export const CompanyRouter = Router()
  .get("/companies/:id", companyValidators.getOne, companyActions.getOne)
  .patch("/companies/:id", companyValidators.editOne, companyActions.editOne)
  .post(
    "/companies/:id/image",
    fileHandler.fields([{ name: "file", maxCount: 1 }]),
    companyValidators.addImage,
    companyActions.addImage
  )
  .delete(
    "/companies/:id/image",
    companyValidators.removeImage,
    companyActions.removeImage
  )
  .get("/companies", parseJson(["filters", "pagination", "order"]), companyActions.getMany);
