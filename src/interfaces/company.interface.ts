import { ECompanyStatus, ECompanyType } from "../enums";
import { FindOptionsOrder } from "typeorm";
import { CompanyEntity } from "../DB/postgres/entities/company.entity";

export interface IGetAllCompaniesOptionsPayload {
  filters?: {
    status?: ECompanyStatus[];
    type?: ECompanyType[];
  };
  order?: FindOptionsOrder<CompanyEntity>;
  pagination?: {
    limit?: number;
    offset?: number;
  };
}
