import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", { nullable: true })
  full_name?: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column("varchar", { length: 255 })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
