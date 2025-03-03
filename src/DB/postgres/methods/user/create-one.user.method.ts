import { IUserSignUpPayload } from "../../../../interfaces";
import { postgresDb } from "../../../../services";
import { UserEntity } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import { UserDTO } from "../../../../DTO";

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {IUserSignUpPayload} userPayload
 * @return {Promise<UserEntity>}
 */
export async function createOne(userPayload: IUserSignUpPayload) {
  const userRepository = postgresDb.connection!.getRepository(UserEntity);

  userPayload.password = await bcrypt.hash(userPayload.password, 10);

  const newUser = await userRepository.save(userPayload);

  return new UserDTO(newUser);
}
