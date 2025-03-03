import { check } from "express-validator";
import { BadRequest, UnprocessableEntity } from "../../constants";
import { ValidationMiddleware } from "../../middleware";
import { postgresDb } from "../../services";
import { UserEntity } from "../../DB/postgres/entities/user.entity";

const getAuth = [
  check("user")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "user: parameter is required",
    })
    .bail()
    .custom((value) => value.id)
    .withMessage({
      code: UnprocessableEntity,
      message: "user.id: parameter is required",
    }),
  ValidationMiddleware,
];

const signup = [
  check("email")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter is required",
    })
    .bail()
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: must be a valid email address",
    })
    .bail()
    .custom(async (email) => {
      const userRepository = postgresDb.connection!.getRepository(UserEntity);
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        throw new Error("email: already exists");
      }
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "email: already exists",
    }),

  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    })
    .bail()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: must be a string",
    })
    .bail()
    .isLength({ min: 7 })
    .withMessage({
      code: UnprocessableEntity,
      message: "password: must be at least 7 characters long",
    }),

  ValidationMiddleware,
];

const signin = [
  check("email")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter is required",
    })
    .bail()
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: must be a valid email address",
    }),

  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    })
    .bail()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: must be a string",
    }),

  ValidationMiddleware,
];

export const usersValidators = {
  getAuth,
  signup,
  signin,
};
