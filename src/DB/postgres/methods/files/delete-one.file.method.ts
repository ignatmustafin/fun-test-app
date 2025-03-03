import { postgresDb } from "../../../../services";
import { FileEntity } from "../../entities/file.entity";
import { getOne } from "./get-one.file.method";
import { NotFound } from "../../../../constants";

/**
 * Удаляет запись в таблице files.
 * @param {number} id
 * @return {Promise<boolean>}
 */
export async function deleteOne(id: number) {
  const fileRepository = postgresDb.connection!.getRepository(FileEntity);

  const existingFile = await getOne(id);
  if (!existingFile) {
    throw new NotFound(`File with id ${id} not found`);
  }

  const deletedFile = await fileRepository.delete(existingFile.id);

  return deletedFile.affected === 1;
}
