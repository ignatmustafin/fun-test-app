import { postgresDb } from "../../../../services";
import { ContactEntity } from "../../entities/contact.entity";
import { UserEntity } from "../../entities/user.entity";
import { NotFound } from "../../../../constants";

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {string} email
 * @return {Object|null}
 */
export async function getOne(email: string) {
  const userRepository = postgresDb.connection!.getRepository(UserEntity);
  return userRepository.findOneBy({ email });
}
