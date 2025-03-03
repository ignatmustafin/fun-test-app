import { body, check, param } from "express-validator";
import { EErrorCode } from "../../enums";
import path from "path";
import { createLogger, imageService } from "../../services";
import { ValidationMiddleware } from "../../middleware";

const logger = createLogger(module);

const getOne = [
  check("id").isNumeric().withMessage({
    code: EErrorCode.UNPROCESSABLE_ENTITY,
    message: "id: parameter has incorrect format",
  }),
  ValidationMiddleware,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: EErrorCode.UNPROCESSABLE_ENTITY,
    message: "id: parameter has incorrect format",
  }),
  ValidationMiddleware,
];

const addImage = [
  param("id").isNumeric().withMessage({
    code: EErrorCode.UNPROCESSABLE_ENTITY,
    message: "param.id: parameter has incorrect format",
  }),
  body("userId").isNumeric().withMessage({
    code: EErrorCode.UNPROCESSABLE_ENTITY,
    message: "body.userId: parameter has incorrect format",
  }),
  body()
    .custom((_, { req }) => req.files?.file[0])
    .withMessage({
      code: EErrorCode.UNPROCESSABLE_ENTITY,
      message: "file: parameter is required",
    })
    .bail()
    .custom(async (_, { req }) => {
      const file = req.files.file[0];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const tempFilePath = file.path;

      const isAllowedExtension = [".png", ".jpg", ".jpeg", ".gif"].includes(
        fileExtension
      );
      if (!isAllowedExtension) {
        await imageService
          .removeImage(tempFilePath)
          .catch((err) => logger.error(err));
      }
      return isAllowedExtension;
    })
    .withMessage({
      code: EErrorCode.UNPROCESSABLE_ENTITY,
      message: "files.file: only image files are allowed to upload",
    }),
  ValidationMiddleware,
];

const removeImage = [
  check("id").isNumeric().withMessage({
    code: EErrorCode.UNPROCESSABLE_ENTITY,
    message: "id: parameter has incorrect format",
  }),
  ValidationMiddleware,
];

export const companyValidators = { getOne, editOne, addImage, removeImage };
