import { postgresDb } from "../../../../services";
import { CompanyEntity } from "../../entities/company.entity";
import { getOne } from "./get-one.company.method";
import { BadRequest } from "../../../../constants";

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
export async function editOne(
  id: number,
  data: Partial<
    Omit<
      CompanyEntity,
      "id" | "createdAt" | "updatedAt" | "contract" | "photos"
    >
  >
) {
  const companyRepository = postgresDb.connection!.getRepository(CompanyEntity);
  const existingCompany = await getOne(id);

  if (!existingCompany) {
    throw new BadRequest(`Company with id ${id} not found.`);
  }

  companyRepository.merge(existingCompany, data);
  return companyRepository.save(existingCompany);
}
