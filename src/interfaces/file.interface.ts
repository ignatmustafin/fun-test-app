import { FileEntity } from "../DB/postgres/entities/file.entity";

export interface IFileCreatePayload extends Omit<FileEntity, "id"> {}
