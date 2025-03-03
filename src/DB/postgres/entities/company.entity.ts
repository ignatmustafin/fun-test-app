import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { ContactEntity } from "./contact.entity";
import { ECompanyStatus, ECompanyType } from "../../../enums";
import { FileEntity } from "./file.entity";
import { ContractEntity } from "./contract.entity";

@Entity("companies")
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", { nullable: true })
  name?: string;

  @Column("varchar", { name: "short_name", nullable: true, length: 256 })
  shortName?: string;

  @Column("varchar", { name: "business_entity", nullable: true, length: 64 })
  businessEntity?: string;

  @Column("text", { nullable: true })
  address?: string;

  @OneToOne(() => ContractEntity, (contract) => contract.company)
  contract!: ContractEntity;

  @Column("enum", { array: true, enum: ECompanyType })
  type: ECompanyType[] = [];

  @Column("enum", { enum: ECompanyStatus, default: ECompanyStatus.ACTIVE })
  status!: ECompanyStatus;

  @Column({ name: "contact_id" })
  contactId!: number;

  @ManyToOne(() => ContactEntity)
  @JoinColumn({ name: "contact_id" })
  contact!: ContactEntity;

  @ManyToMany(() => FileEntity)
  @JoinTable({
    joinColumn: { name: "company_id" },
    inverseJoinColumn: { name: "file_id"},
  })
  photos!: FileEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
