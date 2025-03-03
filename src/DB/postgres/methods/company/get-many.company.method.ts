import { postgresDb } from "../../../../services";
import { CompanyEntity } from "../../entities/company.entity";
import { ArrayOverlap, In } from "typeorm";
import { IGetAllCompaniesOptionsPayload } from "../../../../interfaces";

/**
 * Возвращает данные множества компаний
 * @param {IGetAllCompaniesOptionsPayload} payload
 * @return {Promise<CompanyEntity[]>}
 */
export function getMany(payload: IGetAllCompaniesOptionsPayload) {
  const companyRepository = postgresDb.connection!.getRepository(CompanyEntity);
  const { filters, order, pagination } = payload;

  return companyRepository.find({
    relations: {
      photos: true,
      contract: true,
    },
    where: {
      ...(filters?.status && { status: In(filters.status) }),
      ...(filters?.type && { type: ArrayOverlap(filters.type) }),
    },
    ...(order && { order }),
    ...(pagination?.limit && { take: pagination.limit }),
    ...(pagination?.offset && { skip: pagination.offset }),
  });
}
