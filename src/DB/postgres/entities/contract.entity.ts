import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity("contracts")
export class ContractEntity {
  @PrimaryGeneratedColumn("uuid")
  no!: number;

  @Column("timestamp", { nullable: true })
  issue_date?: Date;

  @Column({ name: "company_id" })
  company_id!: number;

  @OneToOne(() => CompanyEntity)
  @JoinColumn({ name: "company_id" })
  company!: CompanyEntity;
}
