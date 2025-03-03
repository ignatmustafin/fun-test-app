import { UserEntity } from "../DB/postgres/entities/user.entity";

export interface IUserSignUpPayload
  extends Omit<UserEntity, "id" | "created_at" | "updated_at"> {}

export interface IUserSignInPayload
  extends Pick<UserEntity, "email" | "password"> {}
