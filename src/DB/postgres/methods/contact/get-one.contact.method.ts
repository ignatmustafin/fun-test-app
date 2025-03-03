import { postgresDb } from "../../../../services";
import { ContactEntity } from "../../entities/contact.entity";

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
export function getOne(id: number) {
  const contactRepository = postgresDb.connection!.getRepository(ContactEntity);
  return contactRepository.findOneBy({ id });
}
