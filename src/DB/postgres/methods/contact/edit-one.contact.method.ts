import { postgresDb } from "../../../../services";
import { ContactEntity } from "../../entities/contact.entity";
import { getOne } from "./get-one.contact.method";
import { BadRequest } from "../../../../constants";

/**
 * Редактирует данные контакта с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Promise<ContactEntity>}
 */
export async function editOne(
  id: number,
  data: Partial<Omit<ContactEntity, "id" | "createdAt" | "updatedAt">>
) {
  const contactRepository = postgresDb.connection!.getRepository(ContactEntity);

  const existingContact = await getOne(id);
  if (!existingContact) {
    throw new BadRequest(`Contact with id ${id} not found`);
  }

  contactRepository.merge(existingContact, data);
  return contactRepository.save(existingContact);
}
