import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files")
export class FileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  name!: string;

  @Column("text", { nullable: false, name: "file_path" })
  filepath!: string;

  @Column("text", { nullable: true, name: "thumb_path" })
  thumbpath?: string;
}
