import { UserEntity } from "../DB/postgres/entities/user.entity";

export class UserDTO implements Omit<UserEntity, "password"> {
  id: number;
  email: string;
  full_name?: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.full_name = user.full_name;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
