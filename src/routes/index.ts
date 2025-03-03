import { Router } from "express";
import { NotFound } from "../constants";
import { isAuthorized } from "../middleware";
import { ReadmeRouter } from "./readme";
import { ContactRouter } from "./contacts";
import { UserRouter } from "./users";
import { CompanyRouter } from "./companies";

export const MainRouter = Router()
  .use(ReadmeRouter)
  .use(UserRouter)
  .use(isAuthorized)
  .use(CompanyRouter)
  .use(ContactRouter)
  .use(() => {
    throw new NotFound();
  });
