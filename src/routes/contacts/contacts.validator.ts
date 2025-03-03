import { check } from "express-validator";
import { EErrorCode } from "../../enums";
import { ValidationMiddleware } from "../../middleware";

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

export const contactValidators = {
  getOne,
  editOne,
};
