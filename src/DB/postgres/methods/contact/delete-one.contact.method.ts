import { postgresDb } from "../../../../services";
import { ContactEntity } from "../../entities/contact.entity";
import { getOne } from "./get-one.contact.method";
import { NotFound } from "../../../../constants";

/**
 * Удаляет контакта по id
 * @param {number} id
 * @return {Promise<boolean>}
 */
export async function deleteOne(id: number) {
  const contactRepository = postgresDb.connection!.getRepository(ContactEntity);

  const existingContact = await getOne(id);
  if (!existingContact) {
    throw new NotFound(`Contact with id ${id} not found`);
  }

  const contactDeleted = await contactRepository.delete(existingContact.id);
  return contactDeleted.affected === 1;
}
