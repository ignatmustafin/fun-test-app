import { postgresDb } from "../../../../services";
import { FileEntity } from "../../entities/file.entity"

/**
 * Возвращает файл с указанным идентификатором.
 * @param {number} id
 * @return {Promise<FileEntity | null>}
 */
export function getOne(id: number) {
  const fileRepository = postgresDb.connection!.getRepository(FileEntity);
  return fileRepository.findOneBy({
    id,
  });
}
