import { postgresDb } from "../../../../services";
import { IFileCreatePayload } from "../../../../interfaces/file.interface";
import { FileEntity } from "../../entities/file.entity";

/**
 * Создает новую запись в таблице files.
 * @param {IFileCreatePayload} filePayload
 * @return {Promise<FileEntity>}
 */
export async function createOne(filePayload: IFileCreatePayload) {
  const fileRepository = postgresDb.connection!.getRepository(FileEntity);

  return fileRepository.save(filePayload);
}
