import { Router } from "express";
import { contactsActions } from "./contacts.actions";
import { contactValidators } from "./contacts.validator";

export const ContactRouter = Router()
  .get("/contacts/:id", contactValidators.getOne, contactsActions.getOne)
  .patch("/contacts/:id", contactValidators.editOne, contactsActions.editOne)
  .delete("/contacts/:id", contactValidators.getOne, contactsActions.deleteOne);
