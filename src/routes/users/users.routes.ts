import { Router } from "express";
import { usersValidators } from "./users.validator";
import { parseJson } from "../../middleware";
import { usersActions } from "./users.actions";

export const UserRouter = Router()
  .get(
    "/users/auth",
    parseJson(["user"]),
    usersValidators.getAuth,
    usersActions.getAuth
  )
  .post("/users/signup", usersValidators.signup, usersActions.signup)
  .post("/users/signin", usersValidators.signin, usersActions.signin)
  .post("/users/token/refresh", usersActions.refreshToken);
