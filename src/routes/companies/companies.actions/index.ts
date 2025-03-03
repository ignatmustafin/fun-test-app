import { getOne } from "./get-one.companies.action";
import { editOne } from "./edit-one.companies.action";
import { addImage } from "./add-image.companies.action";
import { removeImage } from "./remove-image.companies.action";
import { getMany } from "./get-many.companies.action";

export const companyActions = {
  getOne,
  editOne,
  addImage,
  removeImage,
  getMany,
};
