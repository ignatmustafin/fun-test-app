import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany,
} from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity("contacts")
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { name: "last_name", nullable: true, length: 64 })
  lastName?: string;

  @Column("varchar", { name: "first_name", nullable: true, length: 64 })
  firstName?: string;

  @Column("varchar", { nullable: true, length: 64 })
  patronymic?: string;

  @Column("varchar", { nullable: true, length: 30 })
  phone?: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => CompanyEntity, (company) => company.contact)
  companies!: CompanyEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email.trim().toLowerCase();
  }
}
