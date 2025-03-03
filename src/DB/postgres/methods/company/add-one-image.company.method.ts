import { postgresDb } from "../../../../services";
import { CompanyEntity } from "../../entities/company.entity";
import { getOne } from "./get-one.company.method";
import { NotFound } from "../../../../constants";
import { FileEntity } from "../../entities/file.entity";

/**
 * Добавляет изображение в связанную таблицу company_files
 * @param {number} companyId
 * @param {FileEntity} file
 * @return {Promise<FileEntity[]>}
 */
export async function addOneImage(companyId: number, file: FileEntity) {
  const companyRepository = postgresDb.connection!.getRepository(CompanyEntity);
  const existingCompany = await getOne(companyId);

  if (!existingCompany) {
    throw new NotFound(`Company with id ${companyId} not found.`);
  }

  existingCompany.photos.push(file)
  await companyRepository.save(existingCompany);

  return existingCompany.photos;
}
