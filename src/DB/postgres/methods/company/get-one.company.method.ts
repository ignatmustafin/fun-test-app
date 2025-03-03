import { postgresDb } from "../../../../services";
import { CompanyEntity } from "../../entities/company.entity";

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {number} id
 * @return {Promise<CompanyEntity | null>}
 */
export function getOne(id: number) {
  const companyRepository = postgresDb.connection!.getRepository(CompanyEntity);
  return companyRepository.findOne({
    where: { id },
    relations: {
      photos: true,
      contract: true,
    }
  });
}
